"use client";

import { memo, useState } from "react";
import { CountryIndexEntry } from "../../../infrastructure/content/country-index";
import { useLocale } from "../../i18n/locale-context";
import { COUNTRY_GROUPS, SCALE_LABEL, boardScale, isSubBoard, subBoardsOf } from "./country-groups";
import {
  AreaSource,
  Bounds,
  MapProjection,
  Plate,
  ViewBox,
  WORLD_PROJECTION,
  centreOf,
  fontFor,
  fullView,
  isMoved,
  layoutPlates,
  medianCentre,
  project,
  unionBounds,
  viewBoxFor,
} from "./picker-areas";

/**
 * 地図から盤面を選ぶ。**大陸をひとつ選んでから、国を選ぶ。**
 *
 * 19枚を世界地図に一度に出すと、アジアだけで9枚が団子になって選べなかった
 * (印を押し離しても、画面上の間隔は指より狭い)。大陸で一段絞ると、
 * どの大陸も2〜9枚になり、**国名をそのまま押せる大きさで書ける。**
 *
 * 中に入っている盤面(茨城⊂日本、バリ⊂インドネシア)は、大陸の縮尺では
 * 親に重なって点にしかならない。**親を押したらそこへ寄って、親と子を並べる。**
 * このときの下地は世界地図ではなく**その盤面自身の絵**にする。世界地図を
 * 日本の大きさまで拡大すると、輪郭が粗すぎて緑の塊にしか見えない(撮って分かった)。
 *
 * ## 寄ったあとは、名札ではなく番号の印と、右の一覧
 *
 * 日本の中には5枚(日本・北海道・九州・茨城・百名山)が入っていて、
 * 名前を書いた札を地図に置くと**「日本百名山」「日本」「茨城県」が重なり合い**、
 * どれが押せるのか迷った(2026-09-02 のプレイ)。押し離しても、百名山は
 * 日本ぜんぶに広がる盤面なので、真ん中に置く限り日本の札とぶつかる。
 * 地図には**番号だけの小さな印**と各盤面の範囲の枠を置き、名前は
 * **地図の右の一覧**に出す。印と一覧は同じ番号で結び、片方に触れれば
 * もう片方も光る。
 *
 * ## 大陸を変えたら、前の盤面は選ばれたままにしない
 *
 * 以前は、アジアを開いても既定の「ボリビア」が選ばれたままで、
 * 日本の中の盤面を押すまで**「ボリビア」で旅に出る状態**だった。
 * 地域を移った時点で、いま見えている範囲に無い盤面は選択から外す
 * (`onSelect(null)`)。見えている範囲に入っている盤面なら残す——
 * 南アメリカでボリビアを選んで世界へ戻り、また南アメリカを開いたときに
 * 選び直させる理由は無い。
 */
type Focus =
  | { readonly kind: "world" }
  | { readonly kind: "continent"; readonly key: string }
  | { readonly kind: "board"; readonly id: string };

export function WorldPicker({
  boards,
  selected,
  onSelect,
}: {
  /** 目録の全部。ここで大陸に振り分ける。 */
  boards: readonly CountryIndexEntry[];
  /** 選ばれている盤面。`null` は「まだ選んでいない」。 */
  selected: string | null;
  /** 盤面を選んだとき。地域を移って選択が外れたときは `null` で呼ぶ。 */
  onSelect: (id: string | null) => void;
}) {
  const { t, tx } = useLocale();
  const byId = new Map(boards.map((board) => [board.id, board]));
  const world = byId.get("world");
  const available = new Set(boards.map((board) => board.id));

  // **必ず大陸選びから始める。**既定の盤面(ボリビア)の大陸から開くようにしてみたが、
  // 誰も選んでいないのに「アメリカ大陸」に居ることになり、
  // そこが選択の入口だと分からなくなった。
  const [focus, setFocus] = useState<Focus>({ kind: "world" });
  /** 印か一覧の、いま指が乗っているほう。相方も光らせるために持つ。 */
  const [hot, setHot] = useState<string | null>(null);

  // **地図の上に置けない盤面**(地球をまわる・太陽系)は大陸に混ぜない。
  const offMapBoards = COUNTRY_GROUPS.filter((group) => group.offMap)
    .flatMap((group) => group.countryIds)
    .filter((id) => available.has(id))
    .map((id) => byId.get(id)!);

  const continents = COUNTRY_GROUPS.filter((group) => !group.offMap)
    .map((group) => ({
      group,
      members: group.countryIds.filter((id) => available.has(id) && !isSubBoard(id)),
    }))
    .filter((entry) => entry.members.length > 0);

  /** その眺めの中に、この盤面を選ぶ手段があるか。無いなら選択を外す。 */
  const holds = (next: Focus, id: string): boolean => {
    if (next.kind === "world") return true;
    if (next.kind === "continent") {
      const here = continents.find((entry) => entry.group.key === next.key);
      return here?.group.countryIds.includes(id) ?? false;
    }
    return next.id === id || subBoardsOf(next.id, available).includes(id);
  };

  /** 眺めを移す。移った先に無い盤面が選ばれていたら、選択を外す。 */
  const enter = (next: Focus) => {
    setFocus(next);
    setHot(null);
    if (selected !== null && !holds(next, selected)) onSelect(null);
  };

  let sources: AreaSource[];
  let view: ViewBox;
  let projection: MapProjection = WORLD_PROJECTION;
  let baseSvg = world?.mapSvg ?? world?.thumbSvg ?? "";
  let onPlate: (id: string) => void;
  let back: { label: string; to: Focus } | null = null;
  /** 地図の下に出すボタン。世界なら「地球をまわる」と太陽系、大陸ならその大陸ぜんぶ。 */
  let whole: CountryIndexEntry[] = [];
  /** 寄った先(親と、その中の盤面)。地図には番号の印、右には一覧を出す。 */
  let inside: { parent: CountryIndexEntry; members: CountryIndexEntry[] } | null = null;

  if (focus.kind === "world") {
    sources = continents.map(({ group, members }) => ({
      id: group.key,
      name: group.label,
      at: medianCentre(
        members.filter((id) => id !== group.wholeBoardId).map((id) => byId.get(id)!.bounds),
      ),
    }));
    view = fullView(WORLD_PROJECTION);
    whole = offMapBoards;
    onPlate = (key) => enter({ kind: "continent", key });
  } else if (focus.kind === "continent") {
    const here = continents.find((entry) => entry.group.key === focus.key) ?? continents[0];
    // 大陸ぜんぶを走る盤面は、国の名札に混ぜない(「ヨーロッパ」が2つ並ぶ)。
    const members = here.members.filter((id) => id !== here.group.wholeBoardId).map((id) => byId.get(id)!);
    whole = here.group.wholeBoardId ? [byId.get(here.group.wholeBoardId)].filter(Boolean) as CountryIndexEntry[] : [];
    sources = members.map((board) => ({ id: board.id, name: board.name, at: centreOf(board.bounds) }));
    view = viewBoxFor(unionBounds(members.map((board) => board.bounds)), WORLD_PROJECTION);
    onPlate = (id) => {
      // 中に入っている盤面があるなら、選ばずにそこへ寄る。
      if (subBoardsOf(id, available).length > 0) enter({ kind: "board", id });
      else onSelect(id);
    };
    back = { label: tx(BACK_TO_WORLD), to: { kind: "world" } };
  } else {
    const parent = byId.get(focus.id)!;
    // **下地はその盤面自身の絵。**座標系も違うので、投影ごと差し替える。
    projection = boardProjection(parent);
    baseSvg = parent.thumbSvg;
    view = fullView(projection);
    const members = [parent, ...subBoardsOf(focus.id, available).map((id) => byId.get(id)!)];
    inside = { parent, members };
    sources = members.map((board) => ({ id: board.id, name: board.name, at: centreOf(board.bounds) }));
    onPlate = onSelect;
    const home = continents.find((entry) => entry.members.includes(focus.id));
    back = home
      ? { label: tx(home.group.label), to: { kind: "continent", key: home.group.key } }
      : { label: tx(BACK_TO_WORLD), to: { kind: "world" } };
  }

  const font = fontFor(view);
  // 寄った先では、札に書くのは番号だけ。名前は右の一覧に出す(重なるため)。
  const labels = sources.map((source) => tx(source.name));
  const texts = inside ? sources.map((_, index) => String(index + 1)) : labels;
  const plates = layoutPlates(sources, texts, view, font, projection);

  const hoverProps = (id: string) => ({
    onMouseEnter: () => setHot(id),
    onMouseLeave: () => setHot((current) => (current === id ? null : current)),
    onFocus: () => setHot(id),
    onBlur: () => setHot((current) => (current === id ? null : current)),
  });

  return (
    <div className="world-picker">
      <div className="picker-bar">
        {back ? (
          <button type="button" className="picker-back" onClick={() => enter(back!.to)}>
            ‹ {back.label}
          </button>
        ) : (
          <span className="picker-hint">{tx(PICK_A_REGION)}</span>
        )}
      </div>

      <div className={`world-picker-stage${inside ? " with-list" : ""}`}>
        <svg
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          className="world-picker-map"
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-label={inside ? tx(inside.parent.name) : tx(world?.name)}
        >
          <BaseMap svg={baseSvg} />

          {/* 中の盤面が走る範囲。親そのものは絵ぜんぶなので枠は描かない。
              押すのは印と一覧なので、枠は指を吸わない(CSSで pointer-events: none)。 */}
          {inside?.members.slice(1).map((board) => (
            <AreaFrame
              key={`area-${board.id}`}
              bounds={board.bounds}
              projection={projection}
              font={font}
              on={board.id === selected}
              hot={board.id === hot}
            />
          ))}

          {/* 動かした名札から、本来の位置への線。名札より先に描いて下に敷く。 */}
          {plates.filter((plate) => isMoved(plate, font)).map((plate) => (
            <line
              key={`leader-${plate.id}`}
              x1={plate.trueX}
              y1={plate.trueY}
              x2={plate.x}
              y2={plate.y}
              className="picker-leader"
            />
          ))}

          {plates.map((plate, index) => (
            <PlateMark
              key={plate.id}
              plate={plate}
              label={labels[index]}
              font={font}
              marker={inside !== null}
              selected={plate.id === selected}
              hot={plate.id === hot}
              onPick={onPlate}
              hover={hoverProps(plate.id)}
            />
          ))}
        </svg>

        {/* 寄った先の一覧。地図の印と同じ番号で結ぶ。 */}
        {inside && (
          <div className="picker-board-list" role="group" aria-label={t("boardsInside", tx(inside.parent.name))}>
            <div className="picker-list-title">{t("boardsInside", tx(inside.parent.name))}</div>
            {inside.members.map((board, index) => (
              <button
                key={board.id}
                type="button"
                className={`picker-list-item${selected === board.id ? " on" : ""}${hot === board.id ? " hot" : ""}`}
                aria-pressed={selected === board.id}
                onClick={() => onSelect(board.id)}
                {...hoverProps(board.id)}
              >
                <span className="picker-list-num" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="picker-list-name">{tx(board.name)}</span>
                <span className={`picker-list-scale ${boardScale(board.id)}`}>
                  {tx(SCALE_LABEL[boardScale(board.id)])}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 地図の上に置けない盤面。「地球をまわる」は1点で指せず、
          太陽系はそもそも地球の上に無い。**緯度経度で印を打つと嘘になる**ので、
          名札ではなくボタンとして地図の下に並べる。
          大陸を開いたときの「大陸まるごと」の盤面も、置き場所は同じ。

          **名前だけを出していたころ、選べる盤面だと気づかれなかった。**
          大陸を開くと国の名札が並び、その下に「Asia」とだけ書かれた帯が出る形で、
          見出しか区切り線にしか見えない。実際に「アジア版が無いと思う」という
          報せが来た(アジア盤面は 65都市・69路線で、ずっと前から出ている)。
          **一言添えて、押せるものだと分かる形にする。** */}
      {whole.map((board) => (
        <button
          key={board.id}
          type="button"
          className={`world-whole-board${selected === board.id ? " on" : ""}`}
          aria-pressed={selected === board.id}
          onClick={() => onSelect(board.id)}
        >
          <span className="whole-name">{tx(board.name)}</span>
          <span className="whole-sub">{tx(board.blurb)}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * 地図の下地。**描き直しを止めるためだけに分けてある。**
 *
 * 下地は16,633文字のSVGで、`dangerouslySetInnerHTML` は描画のたびに
 * これを解析し直す。セットアップ画面は名前の入力・大陸の選択・言語の切り替えの
 * たびに描き直されるので、**名前を1文字打つたびに地図を組み立て直していた。**
 *
 * 検査でも出ていた(セットアップ画面の検査が単体8.8秒、盤面が31枚に増えた
 * ところで並行実行だと時間切れになった)。`memo` で、下地の中身が
 * 変わったときだけ組み立て直す。
 */
const BaseMap = memo(function BaseMap({ svg }: { svg: string }) {
  return <g dangerouslySetInnerHTML={{ __html: svg }} />;
});

/**
 * その盤面の絵の投影。四隅は目録が持っているが、絵の大きさは
 * `thumbViewBox`(`0 0 BW BH`)からしか取れない。
 */
function boardProjection(board: CountryIndexEntry): MapProjection {
  const [, , width, height] = board.thumbViewBox.split(" ").map(Number);
  return { ...board.bounds, width, height };
}

/** 中の盤面が走る範囲の枠。番号の印だけだと、北海道の印が北海道を指すと分からない。 */
function AreaFrame({
  bounds,
  projection,
  font,
  on,
  hot,
}: {
  bounds: Bounds;
  projection: MapProjection;
  font: number;
  on: boolean;
  hot: boolean;
}) {
  const a = project(bounds.lon0, bounds.lat0, projection);
  const b = project(bounds.lon1, bounds.lat1, projection);
  return (
    <rect
      className={`picker-area${on ? " on" : ""}${hot ? " hot" : ""}`}
      x={Math.min(a.x, b.x)}
      y={Math.min(a.y, b.y)}
      width={Math.abs(b.x - a.x)}
      height={Math.abs(b.y - a.y)}
      rx={font * 0.3}
      style={{ strokeWidth: font * 0.08, strokeDasharray: `${font * 0.35} ${font * 0.25}` }}
    />
  );
}

interface HoverProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

function PlateMark({
  plate,
  label,
  font,
  marker,
  selected,
  hot,
  onPick,
  hover,
}: {
  plate: Plate;
  /** 読み上げ名。番号の印のときは、書いてある字(番号)と違う。 */
  label: string;
  font: number;
  /** 番号だけの丸い印として描くか(寄った先)。 */
  marker: boolean;
  selected: boolean;
  hot: boolean;
  onPick: (id: string) => void;
  hover: HoverProps;
}) {
  return (
    <g
      className={`picker-plate${marker ? " marker" : ""}${selected ? " on" : ""}${hot ? " hot" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={selected}
      onClick={() => onPick(plate.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPick(plate.id);
        }
      }}
      {...hover}
    >
      {/* 名前は `<title>` にも入れておく。印の上に載せると吹き出しで名前が読め、
          `.picker-plate` を名前で探す道具(`scripts/shot.mjs`)もそのまま動く。 */}
      {marker && <title>{label}</title>}
      <rect
        x={plate.x - plate.w / 2}
        y={plate.y - plate.h / 2}
        width={plate.w}
        height={plate.h}
        rx={plate.h / 2}
      />
      <text x={plate.x} y={plate.y + font * 0.35} textAnchor="middle" style={{ fontSize: font }}>
        {plate.text}
      </text>
    </g>
  );
}

const BACK_TO_WORLD = {
  en: "All regions",
  es: "Todas las regiones",
  fr: "Toutes les régions",
  ja: "ぜんぶの大陸",
};

const PICK_A_REGION = {
  en: "Pick a region, then a board",
  es: "Elige una región y luego un tablero",
  fr: "Choisis une région, puis un plateau",
  ja: "大陸をえらんでから、盤面をえらぶ",
};
