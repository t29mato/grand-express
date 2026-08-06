"use client";

import { CityId } from "../../../domain/shared-kernel/ids";
import { GameEngineContext } from "../../../application/game-engine-context";
import { createElement } from "react";
import { useLocale } from "../../i18n/locale-context";
import { citySceneOverlayFor } from "./scenes";

/**
 * 都市のイラスト(legacyの `cityArt(id, opts)` の移植)。
 *
 * 背景シーン(`artScenes`)とシンボル(`artGlyphs`)はどちらもlegacyのSVG断片を
 * そのまま抽出したもので(`scripts/extract-legacy-content.mjs` 参照)、
 * 重ね順・座標・スケール(`s=4.1`, `gy=152`)・影の楕円もlegacyと同じ値を使っている。
 *
 * SVG断片は自前のコンテンツJSON(ビルド時にリポジトリへ同梱される静的データ)由来で
 * ユーザー入力は一切含まないため、`dangerouslySetInnerHTML` で挿入している。
 */
export function CityArt({
  context,
  cityId,
  /** true なら都市名・国名のキャプション帯を省く(legacyの `opts.bare`)。 */
  bare = false,
}: {
  context: GameEngineContext;
  cityId: CityId;
  bare?: boolean;
}) {
  const { tx } = useLocale();
  const city = context.getCity(cityId);
  const scenes = context.content.artScenes;
  const scene = scenes[city.artSceneKey] ?? Object.values(scenes)[0] ?? "";
  const glyph = context.content.artGlyphs[city.artGlyphKey] ?? "";

  // 背景の上に重ねる「動きの層」。用意が無い背景は静止のまま。
  const overlay = citySceneOverlayFor(context.content.id, city.artSceneKey);

  const s = 4.1;
  const gy = 152;
  const stripe = context.content.stripeColors;

  const inner =
    scene +
    `<ellipse cx="200" cy="${gy + 3}" rx="${13 * s}" ry="${3.4 * s}" fill="#000" opacity=".18"/>` +
    `<g transform="translate(${200 - 12 * s},${gy - 24 * s}) scale(${s})" stroke="#241a10" stroke-width=".7" stroke-linejoin="round">${glyph}</g>`;

  if (bare) {
    return (
      <div className="city-art-stack">
        <svg viewBox="0 0 400 210" className="city-art" role="presentation" dangerouslySetInnerHTML={{ __html: inner }} />
        {overlay && <div className="city-art-overlay">{createElement(overlay)}</div>}
      </div>
    );
  }

  const caption =
    `<rect x="0" y="210" width="400" height="36" fill="#1b1330"/>` +
    stripe.map((color, i) => `<rect x="${i * 80}" y="210" width="80" height="4" fill="${color}"/>`).join("") +
    `<text x="16" y="236" font-size="19" font-weight="800" fill="#f5b31c">${escapeXml(tx(city.name))}</text>` +
    `<text x="386" y="235" text-anchor="end" font-size="9" font-weight="800" letter-spacing="3" fill="#cfc4b0">${escapeXml(
      tx(context.content.name).toUpperCase(),
    )}</text>`;

  return (
    <div className="city-art-stack">
      <svg
        viewBox="0 0 400 246"
        className="city-art"
        role="presentation"
        dangerouslySetInnerHTML={{ __html: inner + caption }}
      />
      {/* 動きの層は絵の部分だけに重ねる(下の帯は都市名なので覆わない)。
          帯36ぶんを除いた 210/246 の高さに収める。 */}
      {overlay && (
        <div className="city-art-overlay with-caption">{createElement(overlay)}</div>
      )}
    </div>
  );
}

/** 都市名・国名をSVGのテキストへ埋め込む際のエスケープ。 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
