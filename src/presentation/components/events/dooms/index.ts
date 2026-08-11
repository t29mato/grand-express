import { ComponentType } from "react";
import { BoliviaBloqueo } from "./bolivia-bloqueo";
import { BoliviaCollapse } from "./bolivia-collapse";
import { BoliviaLandslide } from "./bolivia-landslide";
import { BoliviaOffering } from "./bolivia-offering";
import { BoliviaSoroche } from "./bolivia-soroche";
import { BoliviaTheft } from "./bolivia-theft";
import { BoliviaTranca } from "./bolivia-tranca";
import { FranceFeuDeGarrigue } from "./france-feu-de-garrigue";
import { FranceGreve } from "./france-greve";
import { FranceMistral } from "./france-mistral";
import { FranceRameCoupee } from "./france-rame-coupee";
import { FranceTireLaine } from "./france-tire-laine";
import { FranceTourneeGenerale } from "./france-tournee-generale";
import { FranceVendangeRatee } from "./france-vendange-ratee";
import { IbarakiAshiatoNuma } from "./ibaraki-ashiato-numa";
import { IbarakiHakobiGaTsukanai } from "./ibaraki-hakobi-ga-tsukanai";
import { IbarakiHoshibaGaNureru } from "./ibaraki-hoshiba-ga-nureru";
import { IbarakiKaminari } from "./ibaraki-kaminari";
import { IbarakiKarakkazeDoom } from "./ibaraki-karakkaze-doom";
import { IbarakiMizuGaHikanai } from "./ibaraki-mizu-ga-hikanai";
import { IbarakiShioGaNoboru } from "./ibaraki-shio-ga-noboru";
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
import { KoreaDokkaebiGil } from "./korea-dokkaebi-gil";
import { KoreaHoesikgap } from "./korea-hoesikgap";
import { KoreaHwangsa } from "./korea-hwangsa";
import { KoreaPoksol } from "./korea-poksol";
import { KoreaSanbul } from "./korea-sanbul";
import { KoreaSomaechigi } from "./korea-somaechigi";
import { KoreaTaepung } from "./korea-taepung";
import { WorldCrossingTheLine } from "./world-crossing-the-line";
import { WorldCustomsShed } from "./world-customs-shed";
import { WorldDevaluation } from "./world-devaluation";
import { WorldExpropriation } from "./world-expropriation";
import { WorldQuarantine } from "./world-quarantine";
import { WorldShellGame } from "./world-shell-game";
import { WorldWrongPort } from "./world-wrong-port";

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
  "france-feu-de-garrigue": FranceFeuDeGarrigue,
  "france-greve": FranceGreve,
  "france-mistral": FranceMistral,
  "france-rame-coupee": FranceRameCoupee,
  "france-tire-laine": FranceTireLaine,
  "france-tournee-generale": FranceTourneeGenerale,
  "france-vendange-ratee": FranceVendangeRatee,
  "ibaraki-ashiato-numa": IbarakiAshiatoNuma,
  "ibaraki-hakobi-ga-tsukanai": IbarakiHakobiGaTsukanai,
  "ibaraki-hoshiba-ga-nureru": IbarakiHoshibaGaNureru,
  "ibaraki-kaminari": IbarakiKaminari,
  "ibaraki-karakkaze-doom": IbarakiKarakkazeDoom,
  "ibaraki-mizu-ga-hikanai": IbarakiMizuGaHikanai,
  "ibaraki-shio-ga-noboru": IbarakiShioGaNoboru,
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
  "korea-dokkaebi-gil": KoreaDokkaebiGil,
  "korea-hoesikgap": KoreaHoesikgap,
  "korea-hwangsa": KoreaHwangsa,
  "korea-poksol": KoreaPoksol,
  "korea-sanbul": KoreaSanbul,
  "korea-somaechigi": KoreaSomaechigi,
  "korea-taepung": KoreaTaepung,
  "world-crossing-the-line": WorldCrossingTheLine,
  "world-customs-shed": WorldCustomsShed,
  "world-devaluation": WorldDevaluation,
  "world-expropriation": WorldExpropriation,
  "world-quarantine": WorldQuarantine,
  "world-shell-game": WorldShellGame,
  "world-wrong-port": WorldWrongPort,
};

/** その国のその災難の絵。無ければ undefined。 */
export function doomAnimationFor(countryId: string, doomId: string): ComponentType | undefined {
  return DOOM_ANIMATIONS[`${countryId}-${doomId}`];
}
