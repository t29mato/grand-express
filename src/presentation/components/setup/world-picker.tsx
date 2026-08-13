"use client";

import { useState } from "react";
import { CountryIndexEntry } from "../../../infrastructure/content/country-index";
import { useLocale } from "../../i18n/locale-context";
import { COUNTRY_GROUPS, isSubBoard, subBoardsOf } from "./country-groups";
import {
  AreaSource,
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
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { tx } = useLocale();
  const byId = new Map(boards.map((board) => [board.id, board]));
  const world = byId.get("world");
  const available = new Set(boards.map((board) => board.id));

  // **必ず大陸選びから始める。**既定の盤面(ボリビア)の大陸から開くようにしてみたが、
  // 誰も選んでいないのに「アメリカ大陸」に居ることになり、
  // そこが選択の入口だと分からなくなった。
  const [focus, setFocus] = useState<Focus>({ kind: "world" });

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

  let sources: AreaSource[];
  let view: ViewBox;
  let projection: MapProjection = WORLD_PROJECTION;
  let baseSvg = world?.mapSvg ?? world?.thumbSvg ?? "";
  let onPlate: (id: string) => void;
  let back: { label: string; to: Focus } | null = null;
  /** 地図の下に出すボタン。世界なら「地球をまわる」と太陽系、大陸ならその大陸ぜんぶ。 */
  let whole: CountryIndexEntry[] = [];

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
    onPlate = (key) => setFocus({ kind: "continent", key });
  } else if (focus.kind === "continent") {
    const here = continents.find((entry) => entry.group.key === focus.key) ?? continents[0];
    // 大陸ぜんぶを走る盤面は、国の名札に混ぜない(「ヨーロッパ」が2つ並ぶ)。
    const members = here.members.filter((id) => id !== here.group.wholeBoardId).map((id) => byId.get(id)!);
    whole = here.group.wholeBoardId ? [byId.get(here.group.wholeBoardId)].filter(Boolean) as CountryIndexEntry[] : [];
    sources = members.map((board) => ({ id: board.id, name: board.name, at: centreOf(board.bounds) }));
    view = viewBoxFor(unionBounds(members.map((board) => board.bounds)), WORLD_PROJECTION);
    onPlate = (id) => {
      // 中に入っている盤面があるなら、選ばずにそこへ寄る。
      if (subBoardsOf(id, available).length > 0) setFocus({ kind: "board", id });
      else onSelect(id);
    };
    back = { label: tx(BACK_TO_WORLD), to: { kind: "world" } };
  } else {
    const parent = byId.get(focus.id)!;
    // **下地はその盤面自身の絵。**座標系も違うので、投影ごと差し替える。
    projection = boardProjection(parent);
    baseSvg = parent.thumbSvg;
    view = fullView(projection);
    sources = [parent, ...subBoardsOf(focus.id, available).map((id) => byId.get(id)!)].map(
      (board) => ({ id: board.id, name: board.name, at: centreOf(board.bounds) }),
    );
    onPlate = onSelect;
    const home = continents.find((entry) => entry.members.includes(focus.id));
    back = home
      ? { label: tx(home.group.label), to: { kind: "continent", key: home.group.key } }
      : { label: tx(BACK_TO_WORLD), to: { kind: "world" } };
  }

  const font = fontFor(view);
  const plates = layoutPlates(sources, sources.map((source) => tx(source.name)), view, font, projection);

  return (
    <div className="world-picker">
      <div className="picker-bar">
        {back ? (
          <button type="button" className="picker-back" onClick={() => setFocus(back!.to)}>
            ‹ {back.label}
          </button>
        ) : (
          <span className="picker-hint">{tx(PICK_A_REGION)}</span>
        )}
      </div>

      <svg
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className="world-picker-map"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label={tx(world?.name)}
      >
        <g dangerouslySetInnerHTML={{ __html: baseSvg }} />

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

        {plates.map((plate) => (
          <PlateMark
            key={plate.id}
            plate={plate}
            font={font}
            selected={plate.id === selected}
            onPick={onPlate}
          />
        ))}
      </svg>

      {/* 地図の上に置けない盤面。「地球をまわる」は1点で指せず、
          太陽系はそもそも地球の上に無い。**緯度経度で印を打つと嘘になる**ので、
          名札ではなくボタンとして地図の下に並べる。 */}
      {whole.map((board) => (
        <button
          key={board.id}
          type="button"
          className={`world-whole-board${selected === board.id ? " on" : ""}`}
          aria-pressed={selected === board.id}
          onClick={() => onSelect(board.id)}
        >
          {tx(board.name)}
        </button>
      ))}
    </div>
  );
}

/**
 * その盤面の絵の投影。四隅は目録が持っているが、絵の大きさは
 * `thumbViewBox`(`0 0 BW BH`)からしか取れない。
 */
function boardProjection(board: CountryIndexEntry): MapProjection {
  const [, , width, height] = board.thumbViewBox.split(" ").map(Number);
  return { ...board.bounds, width, height };
}

function PlateMark({
  plate,
  font,
  selected,
  onPick,
}: {
  plate: Plate;
  font: number;
  selected: boolean;
  onPick: (id: string) => void;
}) {
  return (
    <g
      className={`picker-plate${selected ? " on" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={plate.text}
      aria-pressed={selected}
      onClick={() => onPick(plate.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPick(plate.id);
        }
      }}
    >
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
