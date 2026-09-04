import { CityId, CountryId } from "../../domain/shared-kernel/ids";
import { atlasContentRepository } from "./content-packs";
import { AtlasCity } from "./atlas-types";

/**
 * 盤面の町を読む。
 *
 * 全2,218件をあらかじめ抱えると、地図を開いただけで47枚ぶんのコンテンツ
 * (1枚あたり約200KB)を読むことになる。寄った盤面だけを読み、
 * **同じ盤面は2度読まない。**
 *
 * 読み込みそのものは `JsonCountryContentRepository` に任せている。
 * 動的importの表(47枚ぶん)と、読み込み済みの覚え書きと、zodによる検証が
 * すでにそこにあるので、地図帳のために同じ表をもう1つ作らない
 * (入れ物は `content-packs.ts` の1つを海岸線と分け合う)。
 */

export function loadAtlasCities(boardId: CountryId): Promise<readonly AtlasCity[]> {
  return atlasContentRepository.load(boardId).then((pack) =>
    pack.cities.map(
      (city): AtlasCity => ({
        id: city.id,
        boardId: pack.id,
        name: city.name,
        tag: city.tag,
        fact: city.fact,
        lon: city.longitude,
        lat: city.latitude,
        // 印のSVG断片。見つからない印は空文字にして、描く側が落ちないようにする。
        markSvg: pack.artGlyphs[city.artGlyphKey] ?? "",
        sceneKey: pack.artScenes[city.artSceneKey] ? city.artSceneKey : null,
      }),
    ),
  );
}

/** 町ひとつを引く。盤面を読んでいなければ読む。 */
export async function loadAtlasCity(boardId: CountryId, cityId: CityId): Promise<AtlasCity | null> {
  const cities = await loadAtlasCities(boardId);
  return cities.find((city) => city.id === cityId) ?? null;
}
