"use client";

import { CountryIndexEntry } from "../../../infrastructure/content/country-index";
import { useLocale } from "../../i18n/locale-context";
import { BoardPin, boardPins, isDisplaced, nameSides } from "./world-picker-pins";

/**
 * 世界地図から盤面を選ぶ。
 *
 * 下地は**世界一周の盤面のサムネイルをそのまま使う**(`thumbSvg`)。地図を
 * 別に用意していない。座標系も世界一周の投影(3703×1210)なので、各盤面の
 * 中心を同じ式で落とせばそのまま重なる。
 *
 * 印は必ず重なるので、押し離してから描く(`world-picker-pins.ts`)。
 * 動かした印には、本当の位置へ細い線を引く。**線が無いと、日本の印が
 * 日本を指していないように見える。**
 *
 * 名前は**絞り込んだときだけ**出す。18枚ぶんを地図に載せると字だらけになって、
 * 地図そのものが見えなくなる(撮って確かめた)。地域で絞れば数が減るので、
 * そのときは名前を添えられる。選んでいる盤面の名前は、絞っていなくても出す。
 */
/** これ以下の数まで絞られたら、印に名前を添える。 */
const NAME_LIMIT = 9;

export function WorldPicker({
  boards,
  allBoards,
  selected,
  onSelect,
}: {
  /** 地図に出す盤面(地域で絞られたもの)。 */
  boards: readonly CountryIndexEntry[];
  /** 下地と「地球をまわる」を引くための全一覧。絞り込みの影響を受けない。 */
  allBoards: readonly CountryIndexEntry[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { tx } = useLocale();
  const world = allBoards.find((board) => board.id === "world");
  const pins = boardPins(boards);
  // 絞り込んで数が減ったら、印に名前を添える。**18個に名前を付けると地図が消える。**
  const showNames = pins.length <= NAME_LIMIT;
  // 名前どうしがぶつかるので、置ける場所を決めてから描く(置けなければ出さない)。
  const sides = nameSides(pins, pins.map((pin) => tx(pin.name)));

  return (
    <div className="world-picker">
      <svg
        viewBox={world?.thumbViewBox ?? "0 0 3703 1210"}
        className="world-picker-map"
        role="group"
        aria-label={tx(world?.name)}
      >
        {/* 下地。世界一周の盤面と同じ絵。 */}
        {world && <g dangerouslySetInnerHTML={{ __html: world.mapSvg ?? world.thumbSvg }} />}

        {/* 押し離した印から、本当の位置への引き出し線。印より先に描いて下に敷く。 */}
        {pins.filter(isDisplaced).map((pin) => (
          <line
            key={`leader-${pin.id}`}
            x1={pin.trueX}
            y1={pin.trueY}
            x2={pin.x}
            y2={pin.y}
            className="world-pin-leader"
          />
        ))}

        {/* **丸を全部描いてから、名前を全部描く。**同じ印の中で描くと、
            隣の盤面の丸が名前の頭に乗る(マレーシアの丸がインドネシアの
            「In」を隠していた。撮って分かった)。 */}
        {pins.map((pin) => (
          <PinMark key={pin.id} pin={pin} selected={pin.id === selected} onSelect={onSelect} name={tx(pin.name)} />
        ))}
        {pins.map((pin, index) => {
          // 選んでいる盤面の名前は、置ければ必ず出す(行き先を見失わないため)。
          const side = showNames || pin.id === selected ? (sides[index] ?? (pin.id === selected ? "above" : null)) : null;
          if (!side) return null;
          return (
            <text
              key={`name-${pin.id}`}
              className={`world-pin-name${pin.id === selected ? " on" : ""}`}
              x={pin.x}
              y={pin.y + (side === "above" ? -40 : 75)}
              textAnchor="middle"
            >
              {tx(pin.name)}
            </text>
          );
        })}
      </svg>

      {/* 「地球をまわる」は1点で指せない。地図そのものがその盤面にあたるので、
          印ではなくボタンとして地図の下に置く。 */}
      {world && (
        <button
          type="button"
          className={`world-whole-board${selected === "world" ? " on" : ""}`}
          aria-pressed={selected === "world"}
          onClick={() => onSelect("world")}
        >
          {tx(world.name)}
        </button>
      )}
    </div>
  );
}

function PinMark({
  pin,
  selected,
  name,
  onSelect,
}: {
  pin: BoardPin;
  selected: boolean;
  name: string;
  onSelect: (id: string) => void;
}) {
  return (
    <g
      className={`world-pin${selected ? " on" : ""}`}
      transform={`translate(${pin.x}, ${pin.y})`}
      role="button"
      tabIndex={0}
      aria-label={name}
      aria-pressed={selected}
      onClick={() => onSelect(pin.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(pin.id);
        }
      }}
    >
      {/* 押せる範囲。見えている丸(r=26)より大きくとる。
          指で押す相手なので、見た目の大きさで判定してはいけない。 */}
      <circle r={54} fill="transparent" />
      <circle className="world-pin-dot" r={26} />
      <title>{name}</title>
    </g>
  );
}
