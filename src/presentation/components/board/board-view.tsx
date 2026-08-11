"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CityId, NodeId, PlayerId, PropertyRef, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { isCityNode } from "../../../domain/board/node";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { railPolylines, useBoardLayout } from "../../hooks/use-board-layout";
import { useCamera } from "../../hooks/use-camera";
import { useLocale } from "../../i18n/locale-context";
import { useCityLabels } from "../../hooks/use-city-labels";
import { SIZES } from "./board-metrics";
import { hauntedPlayerId } from "./spirit-rider";
import { TrainToken } from "./train-token";
import { tokenPlacements } from "./token-layout";
import { TerrainLayer } from "./terrain-layer";
import { BoardLegend } from "./board-legend";
import { BoardCompass } from "./board-compass";
import { candidateLabels as buildCandidateLabels, nextFocusIndex, orderByAzimuth } from "./candidate-guide";
import { soundAdapter } from "../../state/game-store-dependencies";
import { WALK_STEP_MS } from "../../state/motion-preference";

const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"];

/** 候補が無いときに返す空配列。毎回作ると、これを見ている効果が毎描画で走る。 */
const EMPTY_NODES: readonly NodeId[] = [];

/**
 * 追尾時の視野幅(現行コードの `FOLLOW_W` = 520 / BW 1150 ≒ 0.45)。
 * 盤面の座標系は国ごと・改訂ごとに変わるため、固定値ではなく盤面幅に対する比で持つ。
 */
const FOLLOW_WIDTH_RATIO = 0.45;

/** 路線の3層描画(現行コードの `drawBoard` のレール描画と同じ色・線幅)。 */
const RAIL_LAYERS: readonly {
  stroke: string;
  width: number;
  dash?: string;
  opacity?: number;
  /** レールそのものの層。幹線はここだけ色を変える(縁取りと枕木はそのまま)。 */
  isRailSurface?: boolean;
}[] = [
  { stroke: "#20180f", width: 9, opacity: 0.55 },
  { stroke: "#e6dcc6", width: 5, dash: undefined, isRailSurface: true },
  { stroke: "#3b3123", width: 5, dash: "1.5 9" },
];

/**
 * 航路の描画。陸路(枕木のあるレール)と見分けがつくよう、
 * 海になじむ青系の破線で描く。
 */
const SEA_LAYERS: readonly { stroke: string; width: number; dash?: string; opacity?: number }[] = [
  { stroke: "#0e1626", width: 9, opacity: 0.45 },
  { stroke: "#7fc8e8", width: 5, dash: "14 10" },
  { stroke: "#d8f0ff", width: 2, dash: "4 20", opacity: 0.9 },
];

/**
 * 都市名ラベルの画面上の文字サイズ(CSSピクセル)。
 * SVGの font-size は盤面座標の単位なので、そのまま指定するとズームしても
 * ラベルの相対サイズが変わらず、いつまでも重なったままになる。
 * 画面上で一定サイズになるよう毎回換算し、ズームインするほど地図に対して
 * 小さく=すいて見えるようにする。
 */
const LABEL_FONT_PX = 13;
const DEST_LABEL_FONT_PX = 15;


/**
 * 中間マスの色と記号(現行コードの `SQUARE`)。
 * カードマス(★)は廃止した。マスの種類が4つあると見分けが付きにくく、
 * アイテムは屋台とクイズの褒美で十分手に入るため。
 * クイズマスは**難易度で色分けしない**。難易度はマスではなく問題の属性になり、
 * 止まった時点でプレイヤーの知識レベルに応じて抽選されるため、
 * マスを見て難易度が分かるわけではない。
 */
const SQUARE_STYLES: Record<string, { color: string; glyph: string }> = {
  quiz: { color: "#f5b31c", glyph: "?" },
  blue: { color: "#5b8fe8", glyph: "+" },
  red: { color: "#e05252", glyph: "−" },
};

/**
 * 幹線(その国の背骨になる路線)。**都市の並びで書く。**
 *
 * 辺に1つずつ印を付ける形にすると、東海道新幹線のように何区間も続く路線を
 * 表せない(この盤面には tokyo-nagoya のような直通の辺が無く、
 * 横浜・鎌倉・箱根・静岡を経由する連なりになっている)。
 * 並びで書けば、途中の区間を書き落とす心配もない。
 *
 * いまは日本の2本だけの試作。方向が良ければ他の盤面にも広げ、
 * 置き場所も content 側へ移す(絵ではなく内容の話なので)。
 */
const TRUNK_LINES: Record<string, readonly (readonly string[])[]> = {
  japan: [
    // 東北・北海道新幹線
    ["hakodate", "aomori", "morioka", "sendai"],
    // 東海道・山陽新幹線(この盤面では鎌倉・箱根を経由して名古屋へ抜ける)
    ["tokyo", "yokohama", "kamakura", "hakone", "shizuoka", "nagoya", "kyoto", "osaka", "himeji"],
  ],
};

/** 幹線に含まれる区間の集合(都市idを並べ替えて `a|b` の形にしたもの)。 */
function trunkSegments(countryId: string): ReadonlySet<string> {
  const segments = new Set<string>();
  for (const chain of TRUNK_LINES[countryId] ?? []) {
    for (let i = 0; i < chain.length - 1; i++) {
      segments.add([chain[i], chain[i + 1]].sort().join("|"));
    }
  }
  return segments;
}

export interface BoardViewProps {
  context: GameEngineContext;
  session: GameSession;
  reachable: ReadonlySet<NodeId> | null;
  /** サイコロの目(= 進むマス数)。読み上げの案内に使う。 */
  steps?: number;
  /**
   * 道のりを歩いている最中の駒の居場所(見た目だけ)。
   * `session` の居場所より優先して描く。着いたら null に戻る。
   */
  walk?: { readonly playerId: PlayerId; readonly nodeId: NodeId; readonly emoji: string | null } | null;
  onChooseNode?: (id: NodeId) => void;
}

export function BoardView({ context, session, reachable, steps, walk, onChooseNode }: BoardViewProps) {
  const positions = useBoardLayout(context);
  const { tx, t, locale } = useLocale();
  const { boardWidth, boardHeight } = context.content.projection;
  const [overview, setOverview] = useState(false);
  /**
   * 「そこには行けません」と返しているマス。
   * 押しても何も起きないと、壊れているのか操作を間違えたのかが分からない
   * (遊んだ人が「反応していないのでは」と繰り返し戸惑った箇所)。
   * `nonce` は同じマスを続けて押したときに演出をやり直すための連番。
   */
  const [rejected, setRejected] = useState<{ id: NodeId; nonce: number } | null>(null);
  const rejectCount = useRef(0);
  /** 直前の操作が「盤面を動かした」だったか。動かした流れの click は選択とみなさない。 */
  const dragMovedRef = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportWidthPx, setViewportWidthPx] = useState(0);
  const [viewportHeightPx, setViewportHeightPx] = useState(0);
  const { camera, viewBox, fitWidth, animateTo, panByPixels, zoomBy, stopAnimation } = useCamera({
    boardWidth,
    boardHeight,
    // 枠の比をカメラに渡すことで、viewBoxの縦横比が枠と一致する。
    // 一致していないとSVG側で余白付き縮小(preserveAspectRatio)が起き、
    // 「全体表示」でも盤面の端が見えないことがある。
    viewportAspect: viewportHeightPx > 0 ? viewportWidthPx / viewportHeightPx : 0,
  });
  // ドラッグ中の直前のポインタ位置。null ならドラッグしていない。
  const dragRef = useRef<{ x: number; y: number; pointerId: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const activePlayerId = currentPlayer(session).id;
  /** 歩いている最中は、その駒が居るマスをカメラが追う(道のりに沿って画面が付いていく)。 */
  const activeLocation =
    walk && walk.playerId === activePlayerId ? walk.nodeId : currentPlayer(session).location;

  /**
   * 候補の中身から作る鍵。
   *
   * **`reachable` は毎回中身の同じ新しい Set が渡ってくる**
   * (`game-screen.tsx` が描画のたびに `new Set(...)` を作っている)。
   * そのまま useMemo の依存にすると、下の並べ替えと読み上げ文が
   * **毎フレーム作り直される。** カメラが動いているあいだ BoardView は
   * 1秒に60回描き直されるので、読み上げ文のための最短距離探索(候補ごとに
   * 盤面全体のBFS)がその回数だけ走っていた。中身で比べれば1回で済む。
   */
  const reachableKey = reachable ? [...reachable].sort().join("|") : "";

  /**
   * 行き先の候補を、**現在地から見た方位角で北から時計回り**に並べたもの。
   * DOM順(都市を後ろに寄せただけ)のまま矢印キーに割り当てると、
   * 「次」が地図を飛び回って予測できない。
   */
  const orderedCandidates = useMemo(
    () => (reachableKey ? orderByAzimuth(reachableKey.split("|") as NodeId[], positions, activeLocation) : EMPTY_NODES),
    [reachableKey, positions, activeLocation],
  );

  /**
   * 読み上げ文。方位・マスの種類・目的地までの残りの3つ。
   * **同じ文の候補が並んだ組にだけ**、どの路線の上かが足される
   * (`candidate-guide.ts` 参照。6盤面の15.5%の組で起きていた)。
   */
  const candidateLabels = useMemo(
    () => buildCandidateLabels({ context, session, t, tx }, orderedCandidates, positions, activeLocation),
    [orderedCandidates, positions, activeLocation, context, session, t, tx],
  );

  /**
   * いまフォーカスしている候補の番号(ローミングtabindexの「選択中」)。
   *
   * 候補が入れ替わったら先頭に戻す。効果の中で戻すのではなく**描画中に直す**
   * (Reactが勧めている書き方。効果でやると、古い番号のまま1回描かれてしまう)。
   */
  const candidateKey = orderedCandidates.join("|");
  const [seenCandidateKey, setSeenCandidateKey] = useState(candidateKey);
  const [focusIndex, setFocusIndex] = useState(0);
  if (candidateKey !== seenCandidateKey) {
    setSeenCandidateKey(candidateKey);
    setFocusIndex(0);
  }
  /** 候補のDOM要素。矢印キーでフォーカスを移すために持っておく。 */
  const candidateRefs = useRef(new Map<NodeId, SVGGElement>());
  const registerCandidate = useCallback((id: NodeId, el: SVGGElement | null) => {
    if (el) candidateRefs.current.set(id, el);
    else candidateRefs.current.delete(id);
  }, []);

  /** 番号で指した候補へ実際にフォーカスを移す。 */
  const focusCandidateAt = useCallback(
    (index: number) => {
      const id = orderedCandidates[index];
      if (!id) return;
      setFocusIndex(index);
      candidateRefs.current.get(id)?.focus();
    },
    [orderedCandidates],
  );

  /** 直前の操作がキーボードだったか。勝手にフォーカスを移してよいかの判断に使う。 */
  const lastInputWasKeyboardRef = useRef(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key === "Enter" || e.key === " " || e.key.startsWith("Arrow")) {
        lastInputWasKeyboardRef.current = true;
      }
    };
    const onPointer = () => {
      lastInputWasKeyboardRef.current = false;
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
    };
  }, []);

  /**
   * 候補が出たら、先頭の候補へフォーカスを移す。
   *
   * DOM順は 盤面 → サイドパネル なので、**サイコロのボタンは候補より後ろにある。**
   * 振った直後にTabを押しても候補には進めない(戻る向きになる)。
   * 振ったら必ずどれかを選ぶしかない場面なので、勝手に移っても迷子にならない。
   *
   * **キーボードで操作している人にだけ移す。** マウスで遊んでいる人にとっては、
   * 盤面が勝手にフォーカスを奪う動きは邪魔になるだけなので、
   * 直前の操作がキーボードだったときに限る。
   */
  useEffect(() => {
    if (orderedCandidates.length === 0) return;
    if (!lastInputWasKeyboardRef.current) return;
    const id = orderedCandidates[0];
    // 候補の <g> が描かれてから移す。
    const timer = setTimeout(() => candidateRefs.current.get(id)?.focus(), 0);
    return () => clearTimeout(timer);
  }, [orderedCandidates]);

  // 行き先の候補が全部見えるように、候補と現在地を囲む枠を求める。
  // 候補が画面の外にあると、そこへ移りたくても押せない(地図を動かさないと選べない)。
  const candidateFrame = useMemo(() => {
    if (!reachable || reachable.size === 0) return null;
    const here = positions.get(activeLocation);
    const points = [...reachable.keys()].map((id) => positions.get(id)).filter((p) => p !== undefined);
    if (here) points.push(here);
    if (points.length === 0) return null;

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // マーカーと都市名のぶんの余白。
    const margin = SIZES.haloRadius * 4;
    return {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      width: maxX - minX + margin * 2,
      height: maxY - minY + margin * 2,
    };
  }, [reachable, positions, activeLocation]);

  // 手番のプレイヤーを追尾する(現行コードの `focusNode`)。全体表示モードなら盤面全体を映す。
  useEffect(() => {
    if (overview) {
      // 盤面全体が確実に収まる幅(枠が縦長なら盤面幅より広い)。
      animateTo(boardWidth / 2, boardHeight / 2, fitWidth + 60);
      return;
    }

    // マスを選んでいる間は、候補が全部入る大きさまで引く。
    if (candidateFrame) {
      const aspect = viewportHeightPx > 0 ? viewportWidthPx / viewportHeightPx : boardWidth / boardHeight;
      const needed = Math.max(candidateFrame.width, candidateFrame.height * aspect);
      animateTo(
        candidateFrame.cx,
        candidateFrame.cy,
        Math.max(needed, boardWidth * FOLLOW_WIDTH_RATIO),
      );
      return;
    }

    const pos = positions.get(activeLocation);
    if (pos) animateTo(pos.x, pos.y, boardWidth * FOLLOW_WIDTH_RATIO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocation, overview, boardWidth, boardHeight, fitWidth, positions, candidateFrame]);

  // 盤面SVGの実表示サイズを追跡する(盤面座標→画面pxの換算と、viewBoxの縦横比に使う)。
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const rect = svg.getBoundingClientRect();
      setViewportWidthPx(rect.width);
      setViewportHeightPx(rect.height);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  // 盤面座標1単位あたりの画面px。これでラベルを画面上で一定サイズに保つ。
  const unitsPerPx = viewportWidthPx > 0 ? camera.w / viewportWidthPx : 0;
  // ズーム中に毎フレーム再配置しないよう、文字サイズは0.5単位に丸めてから使う。
  const labelFontUnits = Math.round(LABEL_FONT_PX * unitsPerPx * 2) / 2;
  const labelPlacements = useCityLabels({
    context,
    positions,
    fontUnits: labelFontUnits,
    locale,
    destination: session.destination,
  });

  // 盤面のドラッグによる手動パン(現行コードの `pointerdown`/`pointermove` 実装の移植)。
  // 移動可能なマスの上から始まったドラッグは、マスのクリックを妨げないよう無視する。
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      // **ここではまだポインタを捕まえない。**押した時点で捕まえると、そのあとの
      // click が押したマスではなく <svg> に飛んでしまい、マスを押しても
      // 何も起きなくなる(届かないマスに「行けません」を返せなくなる)。
      // 捕まえるのは、実際に指が動いてドラッグだと確定してから。
      // 前の操作の結果を持ち越さない。地図を動かしたあと、その click が
      // 盤面の余白に落ちると印が立ったままになり、次に押したマスが無視されてしまう。
      dragMovedRef.current = false;
      dragRef.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId, moved: false };
      stopAnimation();
    },
    [stopAnimation],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 3) return; // 微小な揺れはクリック扱いのまま
      if (!drag.moved) {
        // ここで初めてドラッグと確定する。枠の外へ出ても追えるよう、ここで捕まえる。
        drag.moved = true;
        setDragging(true);
        svgRef.current?.setPointerCapture(drag.pointerId);
      }
      drag.x = e.clientX;
      drag.y = e.clientY;
      // SVG要素の `clientWidth` はブラウザによって0を返すことがあるため、
      // レイアウト済みの実寸が確実に取れる getBoundingClientRect を使う。
      panByPixels(dx, dy, svgRef.current?.getBoundingClientRect().width ?? 0);
    },
    [panByPixels],
  );

  const endDrag = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    // このあと発火する click が、地図を動かしただけのものかどうかを覚えておく。
    dragMovedRef.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    // 捕まえていないポインタを離そうとすると例外になる環境があるため、持っているときだけ。
    if (svgRef.current?.hasPointerCapture?.(e.pointerId)) svgRef.current.releasePointerCapture(e.pointerId);
  }, []);

  /**
   * マスが押されたとき。届くマスなら選び、**届かないマスにも必ず何かを返す。**
   * 無反応だと「壊れているのか、押す場所を間違えたのか」が分からない。
   */
  const handleNodeClick = useCallback(
    (id: NodeId, isChoosable: boolean) => {
      // 地図をドラッグして指を離しただけのときは、マスを押したことにしない
      // (印は次に押し下げたときに倒れるので、ここでは触らない)。
      if (dragMovedRef.current) return;
      if (isChoosable) {
        onChooseNode?.(id);
        return;
      }
      // 行き先を選んでいる最中でなければ、そもそもマスは押すものではない。
      if (!reachable) return;
      soundAdapter.playThud();
      rejectCount.current += 1;
      setRejected({ id, nonce: rejectCount.current });
    },
    [onChooseNode, reachable],
  );

  /**
   * 候補の上でキーが押されたとき。
   *
   * **`<g role="button">` は本物の <button> ではない。** Enter も Space も
   * クリックに変換されないことを実機で確かめてある(押しても何も起きなかった)。
   * ここで自分で拾わないと、キーボードからはマスを選べない。
   */
  const handleCandidateKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGGElement>, id: NodeId, index: number) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        // Space はページを送るので止める。
        e.preventDefault();
        onChooseNode?.(id);
        return;
      }
      const next = nextFocusIndex(e.key, index, orderedCandidates.length);
      if (next === null) return;
      // 矢印での移動は盤面のスクロールや上下移動に取られたくない。
      e.preventDefault();
      focusCandidateAt(next);
    },
    [onChooseNode, orderedCandidates.length, focusCandidateAt],
  );

  // 「行けません」の演出は短く。出しっぱなしにすると盤面が読みづらくなる。
  useEffect(() => {
    if (!rejected) return;
    const timer = setTimeout(() => setRejected(null), 430);
    return () => clearTimeout(timer);
  }, [rejected]);

  // ホイール/ピンチでのズーム。ページのスクロールを奪わないよう、
  // 盤面上でのホイール操作のときだけ preventDefault する。
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopAnimation();
      zoomBy(e.deltaY > 0 ? 1.12 : 1 / 1.12);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomBy, stopAnimation]);

  /**
   * 路線の線分。陸路と航路で描き分けるため、種類ごとに分けて持つ。
   * 種類は中間マスが持つ `edgeKind` から判定する(都市同士が直接繋がる場合は
   * 中間マスが無いので、相手側から辿れなければ陸路として扱う)。
   */
  // 曲がり角の丸めの半径。マスの間隔に比例させる(盤面の縮尺が変わっても崩れない)。
  const cornerRadius = (context.content.projection.segmentLength ?? 64) / 3;

  const edges = useMemo(() => {
    const rail: { d: string; isTrunk: boolean }[] = [];
    const sea: { d: string; isTrunk: boolean }[] = [];
    // マスとマスを直接結ぶと、折れ点がそのあいだに来たときに角を斜めに
    // 突っ切ってしまう。経路そのもの(折れ点を通る折れ線)を描く。
    const trunk = trunkSegments(context.content.id);
    for (const { points, kind, between } of railPolylines(context, positions)) {
      const d = roundedPath(points, cornerRadius);
      if (kind === "sea") sea.push({ d, isTrunk: false });
      else rail.push({ d, isTrunk: trunk.has([...between].sort().join("|")) });
    }
    return { rail, sea };
  }, [context, positions, cornerRadius]);

  /**
   * 町ごとの持ち主。
   *
   * 桃鉄の面白さの核は「地図が自分の色に染まっていくのを見る」ことなのに、
   * これまで物件を買っても盤面は何も変わらず、所有は横の数字でしか
   * 分からなかった。いちばん多く持っている人の色を町に付ける。
   * 同数で並んだときは色を付けない(誰の町とも言えないため)。
   */
  const ownershipByCity = useMemo(() => {
    const countsByCity = new Map<string, Map<PlayerId, number>>();
    session.players.forEach((player) => {
      for (const ref of player.portfolio.keys()) {
        const { cityId } = PropertyRef.parse(ref);
        const perPlayer = countsByCity.get(cityId) ?? new Map<PlayerId, number>();
        perPlayer.set(player.id, (perPlayer.get(player.id) ?? 0) + 1);
        countsByCity.set(cityId, perPlayer);
      }
    });

    const colorByPlayer = new Map(
      session.players.map((player, i) => [player.id, PLAYER_COLORS[i % PLAYER_COLORS.length]]),
    );
    const result = new Map<string, CityOwnership>();
    for (const [cityId, perPlayer] of countsByCity) {
      const ranked = [...perPlayer.entries()].sort((a, b) => b[1] - a[1]);
      if (ranked.length > 1 && ranked[0][1] === ranked[1][1]) continue;
      const [playerId, owned] = ranked[0];
      const color = colorByPlayer.get(playerId);
      if (!color) continue;
      result.set(cityId, {
        color,
        isMonopoly: owned === context.getCity(CityId(cityId)).properties.length,
      });
    }
    return result;
  }, [session.players, context]);

  const tokensByNode = useMemo(() => {
    const map = new Map<
      string,
      { name: string; color: string; isActive: boolean; isWalking: boolean; carriedEmoji: string | null; spiritEmoji: string | null }[]
    >();
    session.players.forEach((p, i) => {
      // 歩いている駒だけ、盤の状態ではなく見た目の居場所に描く。
      const walking = walk?.playerId === p.id;
      const at = walking ? walk.nodeId : p.location;
      const list = map.get(at) ?? [];
      list.push({
        name: p.name,
        color: PLAYER_COLORS[i % PLAYER_COLORS.length],
        isActive: p.id === activePlayerId,
        isWalking: walking,
        carriedEmoji: walking ? walk.emoji : null,
        // 憑かれている駒にだけ、厄災の神を後ろに付ける。
        // 旅人一覧の 👹 だけでは、盤面を見ているあいだ誰が背負っているか分からない。
        spiritEmoji: hauntedPlayerId(session.misfortune) === p.id ? context.content.spirit.emoji : null,
      });
      map.set(at, list);
    });
    return map;
  }, [session.players, activePlayerId, walk, session.misfortune, context]);

  return (
    // 盤面SVGとその上に重ねるボタン類の基準になる箱。
    // **高さを枠から受け取る**必要がある(高さ0だと、絶対配置のSVGが
    // 固有縦横比に戻ってしまい、盤面の端が見えなくなる)。
    <div className="board-stage">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        /* 行き先を選んでいる間は `choosing` を付ける。届かないものを沈めて、
           届くマスだけが明るく残るようにするため(CSS側で処理)。 */
        className={`board-svg${dragging ? " dragging" : ""}${reachable ? " choosing" : ""}`}
        // 縦長の盤面を横長の枠に収めると盤面の外側が見える。そこを枠の地色ではなく
        // 海の色で埋めて、地図が途中で途切れて見えないようにする。
        style={{ background: context.content.terrain.seaColor }}
        /* **`role="img"` は付けない。** ARIAの img ロールは
           "Children Presentational: True" で、中身がまるごと1つの画像として
           扱われる。付いていた頃は、127〜225個のマスの記号と全都市名が
           1つの読み上げ名に流し込まれ、行き先のマスは押すどころか
           個別の要素としても見えなかった(ariaSnapshotで確認)。
           盤面の飾り(地形・路線・都市名・駒)は下で aria-hidden にして、
           **ツリーに残すのは行き先の候補だけ**にしている。 */
        aria-label={t("boardLabel")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* TerrainLayer はフラグメントを返すので、aria-hidden を付ける先が無い。
            ここで包む(transform を持たない <g> なので描画には影響しない)。 */}
        <g aria-hidden="true">
          <TerrainLayer
            terrain={context.content.terrain}
            projection={context.content.projection}
            monthIndex={session.month}
          />
        </g>
        {/* 路線。legacyの `drawBoard` と同じく、暗い縁取り→明るいレール→枕木のダッシュ
            という3層で描く。legacyは路線1本ずつ3層を重ねるが、ここでは層ごとに
            まとめて描くことで、隣り合う路線の縁取りが手前の路線を欠けさせないようにしている
            (都市の合流点は都市のシンボルが上に載るため見た目の差は出ない)。 */}
        <g className="edges" aria-hidden="true">
          {/* 航路。陸路の下に敷き、波打つ点線で船の道と分かるようにする。 */}
          <g className="sea-routes">
            {SEA_LAYERS.map((layer, layerIndex) => (
              <g key={layerIndex}>
                {edges.sea.map((line, i) => (
                  <path
                    key={i}
                    d={line.d}
                    fill="none"
                    stroke={layer.stroke}
                    strokeWidth={layer.width}
                    strokeLinecap="round"
                    strokeDasharray={layer.dash}
                    opacity={layer.opacity}
                  />
                ))}
              </g>
            ))}
          </g>
          {RAIL_LAYERS.map((layer, layerIndex) => (
            <g key={layerIndex}>
              {edges.rail.map((line, i) => (
                <path
                  key={i}
                  d={line.d}
                  fill="none"
                  /* 幹線はレールを金色にする。**全体表示では見えない。**
                     盤面が約3倍に縮み、路線の上に20px間隔でマスが並ぶので、
                     線の見えている面積が数pxしかない。太さ1.55倍・レール金色・
                     縁取り金色の3案を試して、3案とも全体表示では差が出なかった
                     (撮って確認)。寄った画面(遊んでいるとき)でなら分かる。
                     全体表示でも示すなら、線ではなく帯や都市の大小といった
                     別の手段が要る。 */
                  stroke={line.isTrunk && layer.isRailSurface ? "#e8b04a" : layer.stroke}
                  strokeWidth={layer.width}
                  strokeLinecap="round"
                  strokeDasharray={layer.dash}
                  opacity={layer.opacity}
                />
              ))}
            </g>
          ))}
        </g>
        {/* マスを先に、都市をあとに描く。
            都市のシンボル(鹿・鳥居・城)は円の30px上に描かれるが、押し離しは
            円の中心から半径で見ているので、マスがシンボルの下に潜り込む。
            京都と奈良のように都市が近い場所(39px)では、マスの逃げ場そのものが
            無いことを計測で確かめた(経路を2px刻みで全走査しても空きなし)。
            動かして避けられないなら、**重ね順で見せる。**
            マスは同じ形が何十個も並ぶが、鹿や鳥居はその町に1つしかない。 */}
        {/* 行き先の候補のまとまり。**Tab停止はこのグループで1つだけ**にして、
            候補のあいだは矢印キーで送る(ローミングtabindex)。
            候補以外のマスは `aria-hidden` でツリーから外す。盤面には
            127〜225個のマスがあり、全部をTab順に入れると使い物にならない
            (実測: 候補は2〜15個。5盤面で数えた)。

            **DOM順は方位順になっていない。** ここの並びは上の重ね順
            (マス→都市)がそのまま出るため、矢印キーの順(方位順)とは食い違う。
            並べ替えれば揃うが、そうすると候補のマスが都市のシンボルの上に
            載ってしまい、重ね順を測って決めた判断を壊す。
            矢印で送るぶんには方位順なので、そちらを主の操作として扱う。 */}
        <g
          className="nodes"
          role={orderedCandidates.length > 0 ? "group" : undefined}
          aria-label={
            orderedCandidates.length > 0
              ? t("candidatesGroup", steps ?? 0, orderedCandidates.length)
              : undefined
          }
        >
          {[...context.graph.nodes]
            .sort((a, b) => Number(isCityNode(a[1])) - Number(isCityNode(b[1])))
            .map(([id, node]) => {
            const pos = positions.get(id);
            if (!pos) return null;
            const isDestination = isCityNode(node) && node.cityId === session.destination;
            const isChoosable = reachable?.has(id) ?? false;
            const isRejected = rejected?.id === id;
            const candidateIndex = isChoosable ? orderedCandidates.indexOf(id) : -1;
            const isFocusedCandidate = candidateIndex >= 0 && candidateIndex === focusIndex;
            return (
              <g
                key={id}
                ref={isChoosable ? (el) => registerCandidate(id, el) : undefined}
                transform={`translate(${pos.x}, ${pos.y})`}
                data-choosable={isChoosable ? "true" : undefined}
                /* マスの種類。E2Eから「クイズマスを選ぶ」といった指定ができるようにする
                   (乱数任せに歩き回って偶然止まるのを待つと、試験が不安定になるため)。 */
                data-node-kind={isCityNode(node) ? "city" : node.type}
                /* 「行けません」を返している間だけ、沈めた明るさから戻す
                   (沈めたままだと、せっかくの赤い輪まで薄くなって見えない)。 */
                data-rejected={isRejected ? "true" : undefined}
                /* 目的地は沈めきらない。どちらへ向かうかは、行き先を選ぶときに
                   いちばん見たい情報なので。 */
                data-destination={isDestination ? "true" : undefined}
                /* 候補だけをボタンとして見せる。残りは飾りなので読み上げから外す。 */
                role={isChoosable ? "button" : undefined}
                aria-hidden={isChoosable ? undefined : true}
                aria-label={candidateIndex >= 0 ? candidateLabels[candidateIndex] : undefined}
                /* ローミングtabindex。Tabで入れるのは選択中の1つだけ。 */
                tabIndex={isChoosable ? (isFocusedCandidate ? 0 : -1) : undefined}
                onFocus={candidateIndex >= 0 ? () => setFocusIndex(candidateIndex) : undefined}
                /* **`<g role="button">` では Enter も Space もクリックにならない。**
                   本物の <button> ではないので、ブラウザが変換してくれない
                   (実機で確認済み)。自分で拾う。 */
                onKeyDown={isChoosable ? (e) => handleCandidateKeyDown(e, id, candidateIndex) : undefined}
                /* 届かないマスにもクリックを受けさせる。無反応で返さないため。 */
                onClick={() => handleNodeClick(id, isChoosable)}
                style={{ cursor: isChoosable ? "pointer" : reachable ? "not-allowed" : "inherit" }}
              >
                {/* 揺らすのは内側の<g>。外側は transform 属性で位置を決めているので、
                    そこにCSSの transform を当てると原点に飛んでしまう。
                    key に nonce を入れているのは、同じマスを続けて押したときに
                    アニメーションを頭から流し直すため。 */}
                <g
                  key={isRejected ? `reject-${rejected.nonce}` : "still"}
                  className={isRejected ? "node-reject" : undefined}
                >
                  {/* **押せる範囲を、見た目より広く取る。**
                      マスは画面上おおよそ半径6pxしかなく、数px外すと何も起きなかった
                      (範囲外の弾き返しは効くが、押せるマスを微妙に外すと
                      その経路に入らないので本当に無反応になる)。
                      塗りが無いと当たらないので `fill="transparent"`。
                      いちばん先に描くことで、下の図形より手前には来ない。 */}
                  <circle r={SIZES.hitRadius} fill="transparent" />
                  {isChoosable && <circle r={SIZES.haloRadius} className="halo" />}
                  {isRejected && <circle r={SIZES.haloRadius} className="reject-ring" />}
                  {isCityNode(node) ? (
                    <CityMarker
                      glyphSvg={context.content.artGlyphs[context.getCity(node.cityId).artGlyphKey] ?? ""}
                      isDestination={isDestination}
                      ownership={ownershipByCity.get(node.cityId)}
                    />
                  ) : (
                    <SquareMarker type={node.type} />
                  )}
                </g>
              </g>
            );
          })}
        </g>
        {/* 駒は純粋な表示用マーカー。手前に描画されるため、下のマスへのクリックを
            妨げないよう pointer-events を無効化する(他プレイヤーが乗っているマスへも
            移動できる必要があるため)。 */}
        <g className="tokens" style={{ pointerEvents: "none" }} aria-hidden="true">
          {[...tokensByNode.entries()].map(([nodeId, tokens]) => {
            const pos = positions.get(nodeId as NodeId);
            if (!pos) return null;
            const placements = tokenPlacements(tokens.length);
            // 手番の駒は最後に描いて、他の駒の下に隠れないようにする
            // (置き場所は元の並び順で決めてから、描く順だけを入れ替える)。
            const drawOrder = tokens
              .map((token, i) => ({ token, placement: placements[i] }))
              .sort((a, b) => Number(a.token.isActive) - Number(b.token.isActive));
            return drawOrder.map(({ token, placement }) => (
              <TrainToken
                key={token.name}
                x={pos.x + placement.dx}
                y={pos.y + placement.dy}
                color={token.color}
                isActive={token.isActive}
                scale={placement.scale}
                carriedEmoji={token.carriedEmoji}
                spiritEmoji={token.spiritEmoji}
                /* 1マスごとに位置が変わるので、既定の0.35秒では次のマスまでに滑り切らず、
                   駒が道のりから何マスも遅れてしまう。歩いている駒だけ間隔に合わせる。 */
                stepMs={token.isWalking ? WALK_STEP_MS : undefined}
              />
            ));
          })}
        </g>
        {/* 都市名は独立したレイヤーに描く。マスの<g>に入れるとラベルのぶん
            バウンディングボックスが広がり、その中心が空白に来てクリック判定が
            地形ポリゴンに奪われてしまうため(マスを選べなくなる)。
            最前面に置くことで、他のマーカーに隠れず読めるという利点もある。 */}
        <g className="city-labels" style={{ pointerEvents: "none" }} aria-hidden="true">
          {[...labelPlacements.entries()].map(([cityId, placement]) => {
            const at = positions.get(cityIdToNodeId(cityId));
            if (!at) return null;
            const isDestination = cityId === session.destination;
            const fontUnits = (isDestination ? DEST_LABEL_FONT_PX / LABEL_FONT_PX : 1) * labelFontUnits;
            return (
              <text
                key={cityId}
                className={`city-label${isDestination ? " dest" : ""}`}
                x={at.x + placement.dx}
                y={at.y + placement.dy}
                textAnchor={placement.anchor}
                fontSize={fontUnits}
                strokeWidth={fontUnits * 0.26}
              >
                {tx(context.getCity(cityId).name)}
              </text>
            );
          })}
        </g>
      </svg>
      <BoardLegend currency={context.content.currency} />
      <BoardCompass />
      {/* 全体表示に入っているかどうかが見た目で分かるようにする。
          絵柄・脇のラベル・説明のどれもが状態で変わる(絵柄だけだと気づかれない)。 */}
      <button
        type="button"
        className="cam-toggle"
        data-testid="cam-toggle"
        /* 読み上げのために、名前は入り切りで変えず「全体表示」で固定し、
           いま俯瞰しているかどうかは `aria-pressed` で伝える
           (music-toggle.tsx と同じ形)。マウスの人には `title` で次の動作を出す。 */
        aria-label={t("overviewLabel")}
        aria-pressed={overview}
        onClick={() => setOverview((v) => !v)}
        title={overview ? t("overviewBack") : t("overviewLabel")}
        data-on-label={t("overviewLabel")}
      >
        {/* 色だけに頼らないよう、絵柄も変える(俯瞰中は「戻る=拡大」)。
            名前は aria-label が持つので、絵は読み上げから外す。 */}
        <span aria-hidden="true">{overview ? "🔍" : "🗺"}</span>
      </button>
    </div>
  );
}

/**
 * 盤面上の都市マーカー(legacyの `drawBoard` の city ノード描画)。
 * 影の楕円 → 都市のシンボル(1.25倍) → 円 → 中心の点 → 目的地リング → 都市名
 * という重ね順・座標・色はlegacyと同じ。
 */
/** その町を誰がどれだけ持っているか。 */
interface CityOwnership {
  readonly color: string;
  /** その町の物件を全部持っている(独占)。 */
  readonly isMonopoly: boolean;
}

function CityMarker({
  glyphSvg,
  isDestination,
  ownership,
}: {
  glyphSvg: string;
  isDestination: boolean;
  ownership?: CityOwnership;
}) {
  const scale = SIZES.cityGlyphScale;
  const glyphWidth = 24 * scale;

  return (
    <>
      <ellipse cx={0} cy={2} rx={SIZES.cityShadowRx} ry={SIZES.cityShadowRy} fill="#0e1626" opacity={0.35} />
      <g
        transform={`translate(${-glyphWidth / 2},${-6 - 24 * scale}) scale(${scale})`}
        stroke="#241a10"
        strokeWidth={0.75}
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: glyphSvg }}
      />
      {/* 持ち主の色。物件を1つでも買うと輪が付き、全部そろえると太い二重の輪になる。
          数字を見なくても、盤面が誰の色に染まってきたかが分かるようにするため。 */}
      {ownership && (
        // key に色と独占を含めることで、持ち主が変わった瞬間に要素が作り直され、
        // 輪が広がる演出がもう一度再生される(買ったことが目に留まるように)。
        <circle
          key={`${ownership.color}-${ownership.isMonopoly}`}
          className="own-ring"
          r={SIZES.cityRadius + (ownership.isMonopoly ? 4.5 : 3)}
          fill="none"
          stroke={ownership.color}
          strokeWidth={ownership.isMonopoly ? 5 : 3}
        />
      )}
      {ownership?.isMonopoly && (
        <circle r={SIZES.cityRadius + 8.5} fill="none" stroke={ownership.color} strokeWidth={1.5} opacity={0.7} />
      )}
      <circle r={SIZES.cityRadius} fill="#f6efe2" stroke="#241a10" strokeWidth={2.5} />
      <circle r={SIZES.cityInnerRadius} fill={ownership ? ownership.color : "#241a3f"} />
      {isDestination && (
        <circle r={SIZES.destRingRadius} fill="none" stroke="#f5b31c" strokeWidth={3.5} strokeDasharray="8 9" className="dest-ring" />
      )}
    </>
  );
}

/**
 * 折れ線を、角を丸めたパスにする。
 *
 * 地下鉄の路線図はどれも角が丸い。直角のまま折れると盤面が硬く見えるので、
 * 折れ点の手前と先を半径ぶん切り落として、そのあいだを二次曲線でつなぐ。
 * 脚が短いときは半径を縮める(切り落としすぎて線が消えないように)。
 */
function roundedPath(points: readonly { x: number; y: number }[], radius: number): string {
  if (points.length < 2) return "";
  const parts = [`M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`];

  for (let i = 1; i < points.length - 1; i++) {
    const previous = points[i - 1];
    const corner = points[i];
    const next = points[i + 1];
    const inLength = Math.hypot(corner.x - previous.x, corner.y - previous.y);
    const outLength = Math.hypot(next.x - corner.x, next.y - corner.y);
    if (inLength < 0.01 || outLength < 0.01) continue;

    // 両隣の脚の半分を超えて切らない(隣の折れ点と食い合わないように)。
    const r = Math.min(radius, inLength / 2, outLength / 2);
    const enter = {
      x: corner.x - ((corner.x - previous.x) / inLength) * r,
      y: corner.y - ((corner.y - previous.y) / inLength) * r,
    };
    const leave = {
      x: corner.x + ((next.x - corner.x) / outLength) * r,
      y: corner.y + ((next.y - corner.y) / outLength) * r,
    };
    parts.push(`L${enter.x.toFixed(2)},${enter.y.toFixed(2)}`);
    parts.push(
      `Q${corner.x.toFixed(2)},${corner.y.toFixed(2)} ${leave.x.toFixed(2)},${leave.y.toFixed(2)}`,
    );
  }

  const last = points[points.length - 1];
  parts.push(`L${last.x.toFixed(2)},${last.y.toFixed(2)}`);
  return parts.join(" ");
}

/** 中間マス(クイズ/青/赤/カード)のマーカー(legacyの `SQUARE`/`TIER` の描画)。 */
function SquareMarker({ type }: { type: string }) {
  const style = SQUARE_STYLES[type];
  const color = style?.color ?? "#888";
  const glyph = style?.glyph ?? "";
  return (
    <>
      <rect
        x={-SIZES.squareHalf}
        y={-SIZES.squareHalf}
        width={SIZES.squareHalf * 2}
        height={SIZES.squareHalf * 2}
        rx={5.5}
        fill={color}
        stroke="#20180f"
        strokeWidth={2.5}
      />
      <text
        y={4.5}
        textAnchor="middle"
        fontSize={type === "quiz" ? 12 : 11}
        fontWeight={800}
        fill="#20180f"
        style={{ pointerEvents: "none" }}
      >
        {glyph}
      </text>
    </>
  );
}
