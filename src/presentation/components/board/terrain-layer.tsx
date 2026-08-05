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
export function TerrainLayer({
  terrain,
  projection,
}: {
  terrain: CountryTerrain;
  projection: CountryProjection;
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
