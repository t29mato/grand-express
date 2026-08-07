"use client";

import { useId } from "react";
import { CountryProjection } from "../../../domain/board/board-projection";
import { CountryTerrain, GeoPoint } from "../../../domain/country/country-content-pack";
import { useLocale } from "../../i18n/locale-context";

/**
 * 盤面の背景となる地形レイヤー(legacyの `drawBoard()` 前半の移植)。
 * 海 → 波模様 → 陸の影 → 陸 → (陸でクリップした)地形・装飾・湖・河川・地名
 * という重ね順・色・線幅・オフセットはlegacyと同じ値を使っている。
 *
 * 装飾(`decorSvg`)は抽出時にlegacyの `decor()` を評価して得た静的なSVG断片
 * (`scripts/extract-legacy-content.mjs` 参照)。コンテンツJSON由来でユーザー入力を
 * 含まないため `dangerouslySetInnerHTML` で挿入している。
 */
/**
 * 浅瀬の帯。外側(広い)から内側(狭い)の順に重ねる。
 * 幅は盤面座標。狭い盤面でも広い盤面でも岸のまわりだけに収まる大きさにしてある。
 */
/**
 * 月ごとの陸の色みかけ。0=4月。
 *
 * 季節の仕組み(月ごとの収入倍率・12本の絵)はすでにあるのに、
 * **盤面だけが1年じゅう同じ色**だった。月が替わったことが地図にも出るように、
 * 陸の上に薄い色を1枚かける。
 *
 * **濃さは実際に並べて決めた。** 最初は不透明度0.07〜0.14にしたが、
 * 12ヶ月を並べると**1月と7月が区別できなかった**(WBSの合格条件は
 * 「1月と7月が違って見えること」)。0.24〜0.44まで上げて初めて差が出た。
 *
 * 4月は当初「花の桃色」にしたが、桃色を緑にかけると濁った灰緑になったので
 * 淡い暖色に替えた。**緑地の上にかける色は、単体で綺麗でも重ねると濁る。**
 *
 * 未確認: この値は平らな緑(#7aa85a)の上で並べて決めた。実際の盤面には
 * 地方ごとの色分けと雪国の白が乗るので、**月を進めて実機で見る確認がまだ**。
 *
 * 南半球を含む世界一周では北と南で季節が逆になるが、いまは盤面全体に
 * 同じ色をかけている。大陸ごとに変えるなら地方の多角形が要る(いまは無い)。
 */
const SEASON_WASH: readonly { color: string; opacity: number }[] = [
  { color: "#e8d0b0", opacity: 0.26 }, //  4月 花(桃色を緑にかけると濁るので、淡い暖色にした)
  { color: "#c8f08a", opacity: 0.26 }, //  5月 新緑
  { color: "#8fd4b0", opacity: 0.24 }, //  6月 雨と緑
  { color: "#ffe07a", opacity: 0.28 }, //  7月 盛夏
  { color: "#ffcf5a", opacity: 0.3 }, //  8月 日差し
  { color: "#e8c878", opacity: 0.26 }, //  9月 実り
  { color: "#f59a4a", opacity: 0.34 }, // 10月 紅葉
  { color: "#d97a3a", opacity: 0.34 }, // 11月 晩秋
  { color: "#b8d4f0", opacity: 0.34 }, // 12月 冬の入り
  { color: "#e0f0ff", opacity: 0.44 }, //  1月 真冬
  { color: "#cfe4f7", opacity: 0.4 }, //  2月 冬の底
  { color: "#e0f0b0", opacity: 0.26 }, //  3月 早春
];

const SHELF_BANDS: readonly { width: number; opacity: number }[] = [
  { width: 54, opacity: 0.035 },
  { width: 32, opacity: 0.045 },
  { width: 15, opacity: 0.055 },
];

export function TerrainLayer({
  terrain,
  projection,
  monthIndex,
}: {
  terrain: CountryTerrain;
  projection: CountryProjection;
  /** いまの月(0=4月)。季節の色みかけに使う。 */
  monthIndex: number;
}) {
  const { tx } = useLocale();
  // 同じページに複数の盤面が現れても衝突しないようIDを一意化する。
  const rawId = useId();
  const seaPatternId = `sea-${rawId}`;
  const landClipId = `landclip-${rawId}`;

  const { boardWidth: bw, boardHeight: bh } = projection;
  const px = (lon: number) => ((lon - projection.lon0) / (projection.lon1 - projection.lon0)) * bw;
  const py = (lat: number) => ((lat - projection.lat0) / (projection.lat1 - projection.lat0)) * bh;
  const toPoints = (polygon: readonly GeoPoint[]) => polygon.map(([lo, la]) => `${px(lo)},${py(la)}`).join(" ");

  return (
    <>
      <defs>
        <pattern id={seaPatternId} width={26} height={26} patternUnits="userSpaceOnUse">
          <rect width={26} height={26} fill={terrain.seaColor} />
          <path d="M0,13 q6.5,-5 13,0 t13,0" stroke={terrain.seaWaveColor} strokeWidth={2} fill="none" />
        </pattern>
        <clipPath id={landClipId}>
          {terrain.landPolygons.map((polygon, i) => (
            <polygon key={i} points={toPoints(polygon)} />
          ))}
        </clipPath>
      </defs>

      <rect x={0} y={0} width={bw} height={bh} fill={terrain.seaColor} />
      <rect x={0} y={0} width={bw} height={bh} fill={`url(#${seaPatternId})`} />

      {/* 岸から沖への浅瀬。海がのっぺりした一色だと陸との境が硬く、
          地図というより切り絵に見える。陸の輪郭を太い線でなぞって、
          岸に近いほど明るい帯を敷く(線の内側は陸に隠れるので外側だけが残る)。
          色は白の薄がけにして、どの国の海の色でも自然に明るくなるようにしている。 */}
      {SHELF_BANDS.map((band) =>
        terrain.landPolygons.map((polygon, i) => (
          <polygon
            key={`shelf-${band.width}-${i}`}
            points={toPoints(polygon)}
            fill="none"
            stroke="#ffffff"
            strokeWidth={band.width}
            strokeOpacity={band.opacity}
            strokeLinejoin="round"
          />
        )),
      )}

      {/* 陸の落ち影 */}
      {terrain.landPolygons.map((polygon, i) => (
<polygon key={`shadow-${i}`} points={toPoints(polygon)} fill="#0d1424" opacity={0.5} transform="translate(9,13)" />
      ))}
      {terrain.landPolygons.map((polygon, i) => (
        <polygon
          key={`land-${i}`}
          points={toPoints(polygon)}
          fill={terrain.landColor}
          stroke={terrain.coastColor}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      ))}

      <g clipPath={`url(#${landClipId})`}>
        {/* 季節の色みかけ。地形や雪国の塗りより先に敷き、その上に地形を重ねる
            ことで、季節が気配として出つつ塗り分けは読めるままになる。 */}
        <rect
          x={0}
          y={0}
          width={bw}
          height={bh}
          fill={SEASON_WASH[((monthIndex % 12) + 12) % 12].color}
          opacity={SEASON_WASH[((monthIndex % 12) + 12) % 12].opacity}
        />
        {terrain.terrainPolygons.map(([color, polygon], i) => (
          <polygon key={`ter-${i}`} points={toPoints(polygon)} fill={color} />
        ))}
        {terrain.decorSvg && <g dangerouslySetInnerHTML={{ __html: terrain.decorSvg }} />}
        {terrain.lakes.map(([lo, la, rx, ry, rotation, color], i) => (
          <ellipse
            key={`lake-${i}`}
            cx={px(lo)}
            cy={py(la)}
            rx={rx}
            ry={ry}
            fill={color}
            transform={`rotate(${rotation} ${px(lo)} ${py(la)})`}
          />
        ))}
        {terrain.rivers.map((river, i) => (
          <polyline
            key={`river-${i}`}
            points={toPoints(river)}
            fill="none"
            stroke="#4f9fd0"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        ))}
        {/* 陸地の地名(水域のラベルはクリップの外に描く) */}
        {terrain.labels
          .filter(([, , , isWater]) => !isWater)
          .map(([lo, la, text], i) => (
            <text
              key={`label-${i}`}
              x={px(lo)}
              y={py(la)}
              textAnchor="middle"
              fill="#f0ead6"
              opacity={0.6}
              fontSize={19}
              letterSpacing={2}
            >
              {tx(text)}
            </text>
          ))}
      </g>

      {terrain.labels
        .filter(([, , , isWater]) => isWater)
        .map(([lo, la, text], i) => (
          <text
            key={`water-label-${i}`}
            x={px(lo)}
            y={py(la)}
            textAnchor="middle"
            fill="#e8f4ff"
            opacity={0.95}
            fontSize={15}
          >
            {tx(text)}
          </text>
        ))}
    </>
  );
}
