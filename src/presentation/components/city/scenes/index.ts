import { ComponentType } from "react";
import { BoliviaAltiplano } from "./bolivia-altiplano";
import { BoliviaAmazon } from "./bolivia-amazon";
import { BoliviaAndes } from "./bolivia-andes";
import { BoliviaCanyon } from "./bolivia-canyon";
import { BoliviaChaco } from "./bolivia-chaco";
import { BoliviaLake } from "./bolivia-lake";
import { BoliviaPantanal } from "./bolivia-pantanal";
import { BoliviaRedcanyon } from "./bolivia-redcanyon";
import { BoliviaSalar } from "./bolivia-salar";
import { BoliviaSavanna } from "./bolivia-savanna";
import { BoliviaTropicalcity } from "./bolivia-tropicalcity";
import { BoliviaValley } from "./bolivia-valley";
import { BoliviaWhitecity } from "./bolivia-whitecity";
import { BoliviaYungas } from "./bolivia-yungas";
import { IndiaArabianport } from "./india-arabianport";
import { IndiaBazaar } from "./india-bazaar";
import { IndiaCapital } from "./india-capital";
import { IndiaCavetemple } from "./india-cavetemple";
import { IndiaCitypark } from "./india-citypark";
import { IndiaDesertfort } from "./india-desertfort";
import { IndiaGhat } from "./india-ghat";
import { IndiaGopuram } from "./india-gopuram";
import { IndiaHimalaya } from "./india-himalaya";
import { IndiaLakepalace } from "./india-lakepalace";
import { IndiaMegacity } from "./india-megacity";
import { IndiaTeagarden } from "./india-teagarden";
import { IndiaWetland } from "./india-wetland";
import { JapanAlps } from "./japan-alps";
import { JapanCastletown } from "./japan-castletown";
import { JapanCitygreen } from "./japan-citygreen";
import { JapanCoasttown } from "./japan-coasttown";
import { JapanForest } from "./japan-forest";
import { JapanFujiview } from "./japan-fujiview";
import { JapanIslandhill } from "./japan-islandhill";
import { JapanMetropolis } from "./japan-metropolis";
import { JapanOldcapital } from "./japan-oldcapital";
import { JapanPort } from "./japan-port";
import { JapanRicefield } from "./japan-ricefield";
import { JapanSeaside } from "./japan-seaside";
import { JapanSnowcity } from "./japan-snowcity";
import { JapanSubtropic } from "./japan-subtropic";
import { JapanValley2 } from "./japan-valley2";
import { JapanVolcano } from "./japan-volcano";

/**
 * 「国-背景キー」→ 都市イラストに重ねる動きのレイヤー。
 *
 * 背景そのもの(legacy由来の静止SVG)は書き換えず、その上に透明な層を
 * 1枚重ねて、波・湯気・雪・灯りの明滅だけを動かす。
 * 作り方は docs/50-authoring/05-city-scene-guide.md を参照。
 *
 * **足し忘れを防ぐため機械的に整えている。** 登録が無い背景は静止のまま。
 */
export const CITY_SCENE_OVERLAYS: Readonly<Record<string, ComponentType>> = {
  "bolivia-altiplano": BoliviaAltiplano,
  "bolivia-amazon": BoliviaAmazon,
  "bolivia-andes": BoliviaAndes,
  "bolivia-canyon": BoliviaCanyon,
  "bolivia-chaco": BoliviaChaco,
  "bolivia-lake": BoliviaLake,
  "bolivia-pantanal": BoliviaPantanal,
  "bolivia-redcanyon": BoliviaRedcanyon,
  "bolivia-salar": BoliviaSalar,
  "bolivia-savanna": BoliviaSavanna,
  "bolivia-tropicalcity": BoliviaTropicalcity,
  "bolivia-valley": BoliviaValley,
  "bolivia-whitecity": BoliviaWhitecity,
  "bolivia-yungas": BoliviaYungas,
  "india-arabianport": IndiaArabianport,
  "india-bazaar": IndiaBazaar,
  "india-capital": IndiaCapital,
  "india-cavetemple": IndiaCavetemple,
  "india-citypark": IndiaCitypark,
  "india-desertfort": IndiaDesertfort,
  "india-ghat": IndiaGhat,
  "india-gopuram": IndiaGopuram,
  "india-himalaya": IndiaHimalaya,
  "india-lakepalace": IndiaLakepalace,
  "india-megacity": IndiaMegacity,
  "india-teagarden": IndiaTeagarden,
  "india-wetland": IndiaWetland,
  "japan-alps": JapanAlps,
  "japan-castletown": JapanCastletown,
  "japan-citygreen": JapanCitygreen,
  "japan-coasttown": JapanCoasttown,
  "japan-forest": JapanForest,
  "japan-fujiview": JapanFujiview,
  "japan-islandhill": JapanIslandhill,
  "japan-metropolis": JapanMetropolis,
  "japan-oldcapital": JapanOldcapital,
  "japan-port": JapanPort,
  "japan-ricefield": JapanRicefield,
  "japan-seaside": JapanSeaside,
  "japan-snowcity": JapanSnowcity,
  "japan-subtropic": JapanSubtropic,
  "japan-valley2": JapanValley2,
  "japan-volcano": JapanVolcano,
};

/** その国のその背景に重ねる動き。無ければ undefined(静止のまま)。 */
export function citySceneOverlayFor(countryId: string, sceneKey: string): ComponentType | undefined {
  return CITY_SCENE_OVERLAYS[`${countryId}-${sceneKey}`];
}
