import { ComponentType } from "react";
import { BoliviaBloqueo } from "./bolivia-bloqueo";
import { BoliviaCollapse } from "./bolivia-collapse";
import { BoliviaLandslide } from "./bolivia-landslide";
import { BoliviaOffering } from "./bolivia-offering";
import { BoliviaSoroche } from "./bolivia-soroche";
import { BoliviaTheft } from "./bolivia-theft";
import { BoliviaTranca } from "./bolivia-tranca";
import { IndiaBandh } from "./india-bandh";
import { IndiaChori } from "./india-chori";
import { IndiaCyclone } from "./india-cyclone";
import { IndiaDrought } from "./india-drought";
import { IndiaMonsoonflood } from "./india-monsoonflood";
import { IndiaTollgate } from "./india-tollgate";
import { IndiaWrongtrain } from "./india-wrongtrain";
import { JapanBottakuri } from "./japan-bottakuri";
import { JapanDelay } from "./japan-delay";
import { JapanFire } from "./japan-fire";
import { JapanMaigo } from "./japan-maigo";
import { JapanQuake } from "./japan-quake";
import { JapanSuri } from "./japan-suri";
import { JapanTyphoon } from "./japan-typhoon";

/**
 * 「国-厄災id」→ その災難の動く絵。
 *
 * 厄災の神に取り憑かれた人に降りかかる災難を見せる。子どもも遊ぶので、
 * 破壊や痛みそのものではなく「慌てている様子」で伝える方針
 * (docs/50-authoring/04-doom-animation-guide.md)。
 *
 * **足し忘れを防ぐため機械的に整えている。**
 */
export const DOOM_ANIMATIONS: Readonly<Record<string, ComponentType>> = {
  "bolivia-bloqueo": BoliviaBloqueo,
  "bolivia-collapse": BoliviaCollapse,
  "bolivia-landslide": BoliviaLandslide,
  "bolivia-offering": BoliviaOffering,
  "bolivia-soroche": BoliviaSoroche,
  "bolivia-theft": BoliviaTheft,
  "bolivia-tranca": BoliviaTranca,
  "india-bandh": IndiaBandh,
  "india-chori": IndiaChori,
  "india-cyclone": IndiaCyclone,
  "india-drought": IndiaDrought,
  "india-monsoonflood": IndiaMonsoonflood,
  "india-tollgate": IndiaTollgate,
  "india-wrongtrain": IndiaWrongtrain,
  "japan-bottakuri": JapanBottakuri,
  "japan-delay": JapanDelay,
  "japan-fire": JapanFire,
  "japan-maigo": JapanMaigo,
  "japan-quake": JapanQuake,
  "japan-suri": JapanSuri,
  "japan-typhoon": JapanTyphoon,
};

/** その国のその災難の絵。無ければ undefined。 */
export function doomAnimationFor(countryId: string, doomId: string): ComponentType | undefined {
  return DOOM_ANIMATIONS[`${countryId}-${doomId}`];
}
