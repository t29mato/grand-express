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
import { TurkeyAyakkabi } from "./turkey-ayakkabi";
import { TurkeyCamyangini } from "./turkey-camyangini";
import { TurkeyKarakoncolosYolu } from "./turkey-karakoncolos-yolu";
import { TurkeyLodos } from "./turkey-lodos";
import { TurkeyMeyhane } from "./turkey-meyhane";
import { TurkeyTrafik } from "./turkey-trafik";
import { TurkeyYankesici } from "./turkey-yankesici";
import { GermanyBergnebel } from "./germany-bergnebel";
import { GermanyFoehn } from "./germany-foehn";
import { GermanyHochwasser } from "./germany-hochwasser";
import { GermanyMarktdieb } from "./germany-marktdieb";
import { GermanyRunde } from "./germany-runde";
import { GermanyStau } from "./germany-stau";
import { GermanySturmflut } from "./germany-sturmflut";
import { ChinaChaiqian } from "./china-chaiqian";
import { ChinaChunyun } from "./china-chunyun";
import { ChinaMiaohuiPaishou } from "./china-miaohui-paishou";
import { ChinaShachenbao } from "./china-shachenbao";
import { ChinaSuifenzi } from "./china-suifenzi";
import { ChinaTaifeng } from "./china-taifeng";
import { ChinaWuruTaohuayuan } from "./china-wuru-taohuayuan";
import { UkFeteRainedOff } from "./uk-fete-rained-off";
import { UkFogDelay } from "./uk-fog-delay";
import { UkLastBus } from "./uk-last-bus";
import { UkLeavesOnLine } from "./uk-leaves-on-line";
import { UkParkingWarden } from "./uk-parking-warden";
import { UkQueueJumper } from "./uk-queue-jumper";
import { UkYourRound } from "./uk-your-round";
import { ItalyAutovelox } from "./italy-autovelox";
import { ItalyGrandinata } from "./italy-grandinata";
import { ItalyIncendio } from "./italy-incendio";
import { ItalyMorra } from "./italy-morra";
import { ItalyScippo } from "./italy-scippo";
import { ItalySciopero } from "./italy-sciopero";
import { ItalyTrenoSbagliato } from "./italy-treno-sbagliato";
import { RussiaGibdd } from "./russia-gibdd";
import { RussiaObmennik } from "./russia-obmennik";
import { RussiaOchered } from "./russia-ochered";
import { RussiaBuran } from "./russia-buran";
import { RussiaZastolye } from "./russia-zastolye";
import { RussiaNeTotPoyezd } from "./russia-ne-tot-poyezd";
import { RussiaKarmannik } from "./russia-karmannik";
import { UsaGovernmentshutdown } from "./usa-governmentshutdown";
import { UsaPickuptab } from "./usa-pickuptab";
import { UsaSpeedingticket } from "./usa-speedingticket";
import { UsaThreecardmonte } from "./usa-threecardmonte";
import { UsaTornado } from "./usa-tornado";
import { UsaWildfire } from "./usa-wildfire";
import { UsaWrongexit } from "./usa-wrongexit";
import { IndonesiaBanjir } from "./indonesia-banjir";
import { IndonesiaDicopet } from "./indonesia-dicopet";
import { IndonesiaKalahdomino } from "./indonesia-kalahdomino";
import { IndonesiaKebakaran } from "./indonesia-kebakaran";
import { IndonesiaMacet } from "./indonesia-macet";
import { IndonesiaSalahnaik } from "./indonesia-salahnaik";
import { IndonesiaTilang } from "./indonesia-tilang";
import { MoroccoAtay } from "./morocco-atay";
import { MoroccoChergui } from "./morocco-chergui";
import { MoroccoCompteur } from "./morocco-compteur";
import { MoroccoGrandtaxi } from "./morocco-grandtaxi";
import { MoroccoHarika } from "./morocco-harika";
import { MoroccoNachal } from "./morocco-nachal";
import { MoroccoSouqday } from "./morocco-souqday";
import { GhanaDumsor } from "./ghana-dumsor";
import { GhanaFantasycoffin } from "./ghana-fantasycoffin";
import { GhanaHarmattanhaze } from "./ghana-harmattanhaze";
import { GhanaMatecall } from "./ghana-matecall";
import { GhanaMudroad } from "./ghana-mudroad";
import { GhanaOwarebet } from "./ghana-owarebet";
import { GhanaPickpocket } from "./ghana-pickpocket";
import { BaliAbuVulkanik } from "./bali-abu-vulkanik";
import { BaliArusBalik } from "./bali-arus-balik";
import { BaliHamaTikus } from "./bali-hama-tikus";
import { BaliMenungguDewasa } from "./bali-menunggu-dewasa";
import { BaliMonyetMencuri } from "./bali-monyet-mencuri";
import { BaliRaziaPolisi } from "./bali-razia-polisi";
import { BaliSumbanganUpacara } from "./bali-sumbangan-upacara";
import { MalaysiaBanjirKilat } from "./malaysia-banjir-kilat";
import { MalaysiaBasSalah } from "./malaysia-bas-salah";
import { MalaysiaDendaAes } from "./malaysia-denda-aes";
import { MalaysiaGangguanEts } from "./malaysia-gangguan-ets";
import { MalaysiaKalahMahjong } from "./malaysia-kalah-mahjong";
import { MalaysiaKebakaranPasar } from "./malaysia-kebakaran-pasar";
import { MalaysiaRagut } from "./malaysia-ragut";
import { VenezuelaCarteristaMercado } from "./venezuela-carterista-mercado";
import { VenezuelaColaDeTransito } from "./venezuela-cola-de-transito";
import { VenezuelaDerrumbeAndino } from "./venezuela-derrumbe-andino";
import { VenezuelaRelampagoCatatumbo } from "./venezuela-relampago-catatumbo";
import { VenezuelaSilbonEnganio } from "./venezuela-silbon-enganio";
import { VenezuelaTechoInundado } from "./venezuela-techo-inundado";
import { VenezuelaVacaDeCumpleanos } from "./venezuela-vaca-de-cumpleanos";
import { CanadaGravySpill } from "./canada-gravy-spill";
import { CanadaRaccoonCooler } from "./canada-raccoon-cooler";
import { CanadaBlackIceFender } from "./canada-black-ice-fender";
import { CanadaBlackflySwarm } from "./canada-blackfly-swarm";
import { CanadaLedAstray } from "./canada-led-astray";
import { CanadaDriveThruLine } from "./canada-drive-thru-line";
import { CanadaIceStormOutage } from "./canada-ice-storm-outage";
import { UkraineBazaarPickpocket } from "./ukraine-bazaar-pickpocket";
import { UkraineHrad } from "./ukraine-hrad";
import { UkraineLisovykStezhka } from "./ukraine-lisovyk-stezhka";
import { UkrainePovin } from "./ukraine-povin";
import { UkraineStepovaPozhezha } from "./ukraine-stepova-pozhezha";
import { UkraineTamadaObovYazok } from "./ukraine-tamada-obov-yazok";
import { UkraineZamitil } from "./ukraine-zamitil";
import { BrazilArrastao } from "./brazil-arrastao";
import { BrazilContaAtrasada } from "./brazil-conta-atrasada";
import { BrazilDeslizamento } from "./brazil-deslizamento";
import { BrazilEnchente } from "./brazil-enchente";
import { BrazilGreveOnibus } from "./brazil-greve-onibus";
import { BrazilRedemoinho } from "./brazil-redemoinho";
import { BrazilRodadaBoteco } from "./brazil-rodada-boteco";
import { AustraliaBogged } from "./australia-bogged";
import { AustraliaBushfire } from "./australia-bushfire";
import { AustraliaCoastalCyclone } from "./australia-coastalcyclone";
import { AustraliaHuntsman } from "./australia-huntsman";
import { AustraliaMagpieSwoop } from "./australia-magpieswoop";
import { AustraliaShout } from "./australia-shout";
import { AustraliaSunburn } from "./australia-sunburn";
import { SolarsystemCommblackout } from "./solarsystem-commblackout";
import { SolarsystemDebris } from "./solarsystem-debris";
import { SolarsystemDuststorm } from "./solarsystem-duststorm";
import { SolarsystemFuelshortage } from "./solarsystem-fuelshortage";
import { SolarsystemGravityassistfail } from "./solarsystem-gravityassistfail";
import { SolarsystemRadiationbelt } from "./solarsystem-radiationbelt";
import { SolarsystemSolarflare } from "./solarsystem-solarflare";
import { HyakumeizanKirimayoi } from "./hyakumeizan-kirimayoi";
import { HyakumeizanRakurai } from "./hyakumeizan-rakurai";
import { HyakumeizanKumadeai } from "./hyakumeizan-kumadeai";
import { HyakumeizanHachisasare } from "./hyakumeizan-hachisasare";
import { HyakumeizanManshitsu } from "./hyakumeizan-manshitsu";
import { HyakumeizanKorogashi } from "./hyakumeizan-korogashi";
import { HyakumeizanTengukakushi } from "./hyakumeizan-tengukakushi";
import { EuropeLawine } from "./europe-lawine";
import { EuropeHitzewelle } from "./europe-hitzewelle";
import { EuropeGreveContinentale } from "./europe-greve-continentale";
import { EuropeNebel } from "./europe-nebel";
import { EuropeHerbstlaub } from "./europe-herbstlaub";
import { EuropeWaldbrand } from "./europe-waldbrand";
import { EuropeGrenzstau } from "./europe-grenzstau";
import { NorthamericaHurricane } from "./northamerica-hurricane";
import { NorthamericaHielo } from "./northamerica-hielo";
import { NorthamericaCenizas } from "./northamerica-cenizas";
import { NorthamericaVentisca } from "./northamerica-ventisca";
import { NorthamericaSombreronTrenza } from "./northamerica-sombreron-trenza";
import { NorthamericaAduana } from "./northamerica-aduana";
import { NorthamericaPickpocketMercado } from "./northamerica-pickpocket-mercado";
import { SouthamericaAduanaSudamericana } from "./southamerica-aduana-sudamericana";
import { SouthamericaBloqueoSudamericano } from "./southamerica-bloqueo-sudamericano";
import { SouthamericaCamanchaca } from "./southamerica-camanchaca";
import { SouthamericaCreciente } from "./southamerica-creciente";
import { SouthamericaHuayco } from "./southamerica-huayco";
import { SouthamericaTunchesilba } from "./southamerica-tunchesilba";
import { SouthamericaZonda } from "./southamerica-zonda";
import { AsiaSandstorm } from "./asia-sandstorm";
import { AsiaMonsoonwash } from "./asia-monsoonwash";
import { AsiaAvalanche } from "./asia-avalanche";
import { AsiaRailbuckle } from "./asia-railbuckle";
import { AsiaCustomsdelay } from "./asia-customsdelay";
import { AsiaBazaarpickpocket } from "./asia-bazaarpickpocket";
import { AsiaPowercut } from "./asia-powercut";
import { MexicoHuracan } from "./mexico-huracan";
import { MexicoTemblor } from "./mexico-temblor";
import { MexicoCeniza } from "./mexico-ceniza";
import { MexicoContingencia } from "./mexico-contingencia";
import { MexicoChaneque } from "./mexico-chaneque";
import { MexicoRatero } from "./mexico-ratero";
import { MexicoPadrino } from "./mexico-padrino";
import { SpainSiesta } from "./spain-siesta";
import { SpainCalima } from "./spain-calima";
import { SpainOlaCalor } from "./spain-ola-calor";
import { SpainDana } from "./spain-dana";
import { SpainHuelga } from "./spain-huelga";
import { SpainProcesion } from "./spain-procesion";
import { SpainCarterista } from "./spain-carterista";
import { NewzealandTaniwhaLost } from "./newzealand-taniwha-lost";
import { NewzealandRuapehuAsh } from "./newzealand-ruapehu-ash";
import { NewzealandNorwester } from "./newzealand-norwester";
import { NewzealandFloodWashout } from "./newzealand-flood-washout";
import { NewzealandSandflies } from "./newzealand-sandflies";
import { NewzealandFerryCancelled } from "./newzealand-ferry-cancelled";
import { NewzealandSheepJam } from "./newzealand-sheep-jam";
import { AfricaHarmattan } from "./africa-harmattan";
import { AfricaWashout } from "./africa-washout";
import { AfricaBorderclosed } from "./africa-borderclosed";
import { AfricaGaugebreak } from "./africa-gaugebreak";
import { AfricaCheckpoint } from "./africa-checkpoint";
import { AfricaWildlifedetour } from "./africa-wildlifedetour";
import { AfricaCoppertheft } from "./africa-coppertheft";
import { EgyptKhamsin } from "./egypt-khamsin";
import { EgyptCanalblock } from "./egypt-canalblock";
import { EgyptHeatbuckle } from "./egypt-heatbuckle";
import { EgyptFerryoverload } from "./egypt-ferryoverload";
import { EgyptZaffa } from "./egypt-zaffa";
import { EgyptBlackout } from "./egypt-blackout";
import { EgyptScenicroute } from "./egypt-scenicroute";
import { PeruSorochazo } from "./peru-sorochazo";
import { PeruFriaje } from "./peru-friaje";
import { PeruLlamaTerca } from "./peru-llama-terca";
import { PeruDerrumbeMina } from "./peru-derrumbe-mina";
import { PeruCachoPerdido } from "./peru-cacho-perdido";
import { PeruNeblinaPuna } from "./peru-neblina-puna";
import { PeruRoboTerminal } from "./peru-robo-terminal";

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
  "spain-siesta": SpainSiesta,
  "spain-calima": SpainCalima,
  "spain-ola-calor": SpainOlaCalor,
  "spain-dana": SpainDana,
  "spain-huelga": SpainHuelga,
  "spain-procesion": SpainProcesion,
  "spain-carterista": SpainCarterista,
  "newzealand-taniwha-lost": NewzealandTaniwhaLost,
  "newzealand-ruapehu-ash": NewzealandRuapehuAsh,
  "newzealand-norwester": NewzealandNorwester,
  "newzealand-flood-washout": NewzealandFloodWashout,
  "newzealand-sandflies": NewzealandSandflies,
  "newzealand-ferry-cancelled": NewzealandFerryCancelled,
  "newzealand-sheep-jam": NewzealandSheepJam,
  "mexico-huracan": MexicoHuracan,
  "mexico-temblor": MexicoTemblor,
  "mexico-ceniza": MexicoCeniza,
  "mexico-contingencia": MexicoContingencia,
  "mexico-chaneque": MexicoChaneque,
  "mexico-ratero": MexicoRatero,
  "mexico-padrino": MexicoPadrino,
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
  "turkey-ayakkabi": TurkeyAyakkabi,
  "turkey-camyangini": TurkeyCamyangini,
  "turkey-karakoncolos-yolu": TurkeyKarakoncolosYolu,
  "turkey-lodos": TurkeyLodos,
  "turkey-meyhane": TurkeyMeyhane,
  "turkey-trafik": TurkeyTrafik,
  "turkey-yankesici": TurkeyYankesici,
  "germany-bergnebel": GermanyBergnebel,
  "germany-foehn": GermanyFoehn,
  "germany-hochwasser": GermanyHochwasser,
  "germany-marktdieb": GermanyMarktdieb,
  "germany-runde": GermanyRunde,
  "germany-stau": GermanyStau,
  "germany-sturmflut": GermanySturmflut,
  "china-chaiqian": ChinaChaiqian,
  "china-chunyun": ChinaChunyun,
  "china-miaohui-paishou": ChinaMiaohuiPaishou,
  "china-shachenbao": ChinaShachenbao,
  "china-suifenzi": ChinaSuifenzi,
  "china-taifeng": ChinaTaifeng,
  "china-wuru-taohuayuan": ChinaWuruTaohuayuan,
  "uk-fete-rained-off": UkFeteRainedOff,
  "uk-fog-delay": UkFogDelay,
  "uk-last-bus": UkLastBus,
  "uk-leaves-on-line": UkLeavesOnLine,
  "uk-parking-warden": UkParkingWarden,
  "uk-queue-jumper": UkQueueJumper,
  "uk-your-round": UkYourRound,
  "italy-autovelox": ItalyAutovelox,
  "italy-grandinata": ItalyGrandinata,
  "italy-incendio": ItalyIncendio,
  "italy-morra": ItalyMorra,
  "italy-scippo": ItalyScippo,
  "italy-sciopero": ItalySciopero,
  "italy-treno-sbagliato": ItalyTrenoSbagliato,
  "russia-gibdd": RussiaGibdd,
  "russia-obmennik": RussiaObmennik,
  "russia-ochered": RussiaOchered,
  "russia-buran": RussiaBuran,
  "russia-zastolye": RussiaZastolye,
  "russia-ne-tot-poyezd": RussiaNeTotPoyezd,
  "russia-karmannik": RussiaKarmannik,
  "usa-governmentshutdown": UsaGovernmentshutdown,
  "usa-pickuptab": UsaPickuptab,
  "usa-speedingticket": UsaSpeedingticket,
  "usa-threecardmonte": UsaThreecardmonte,
  "usa-tornado": UsaTornado,
  "usa-wildfire": UsaWildfire,
  "usa-wrongexit": UsaWrongexit,
  "indonesia-banjir": IndonesiaBanjir,
  "indonesia-dicopet": IndonesiaDicopet,
  "indonesia-kalahdomino": IndonesiaKalahdomino,
  "indonesia-kebakaran": IndonesiaKebakaran,
  "indonesia-macet": IndonesiaMacet,
  "indonesia-salahnaik": IndonesiaSalahnaik,
  "indonesia-tilang": IndonesiaTilang,
  "morocco-atay": MoroccoAtay,
  "morocco-chergui": MoroccoChergui,
  "morocco-compteur": MoroccoCompteur,
  "morocco-grandtaxi": MoroccoGrandtaxi,
  "morocco-harika": MoroccoHarika,
  "morocco-nachal": MoroccoNachal,
  "morocco-souqday": MoroccoSouqday,
  "ghana-matecall": GhanaMatecall,
  "ghana-dumsor": GhanaDumsor,
  "ghana-harmattanhaze": GhanaHarmattanhaze,
  "ghana-owarebet": GhanaOwarebet,
  "ghana-fantasycoffin": GhanaFantasycoffin,
  "ghana-mudroad": GhanaMudroad,
  "ghana-pickpocket": GhanaPickpocket,
  "bali-abu-vulkanik": BaliAbuVulkanik,
  "bali-arus-balik": BaliArusBalik,
  "bali-hama-tikus": BaliHamaTikus,
  "bali-menunggu-dewasa": BaliMenungguDewasa,
  "bali-monyet-mencuri": BaliMonyetMencuri,
  "bali-razia-polisi": BaliRaziaPolisi,
  "bali-sumbangan-upacara": BaliSumbanganUpacara,
  "malaysia-banjir-kilat": MalaysiaBanjirKilat,
  "malaysia-bas-salah": MalaysiaBasSalah,
  "malaysia-denda-aes": MalaysiaDendaAes,
  "malaysia-gangguan-ets": MalaysiaGangguanEts,
  "malaysia-kalah-mahjong": MalaysiaKalahMahjong,
  "malaysia-kebakaran-pasar": MalaysiaKebakaranPasar,
  "malaysia-ragut": MalaysiaRagut,
  "world-crossing-the-line": WorldCrossingTheLine,
  "world-customs-shed": WorldCustomsShed,
  "world-devaluation": WorldDevaluation,
  "world-expropriation": WorldExpropriation,
  "world-quarantine": WorldQuarantine,
  "world-shell-game": WorldShellGame,
  "world-wrong-port": WorldWrongPort,
  "venezuela-carterista-mercado": VenezuelaCarteristaMercado,
  "venezuela-cola-de-transito": VenezuelaColaDeTransito,
  "venezuela-derrumbe-andino": VenezuelaDerrumbeAndino,
  "venezuela-relampago-catatumbo": VenezuelaRelampagoCatatumbo,
  "venezuela-silbon-enganio": VenezuelaSilbonEnganio,
  "venezuela-techo-inundado": VenezuelaTechoInundado,
  "venezuela-vaca-de-cumpleanos": VenezuelaVacaDeCumpleanos,
  "canada-gravy-spill": CanadaGravySpill,
  "canada-raccoon-cooler": CanadaRaccoonCooler,
  "canada-black-ice-fender": CanadaBlackIceFender,
  "canada-blackfly-swarm": CanadaBlackflySwarm,
  "canada-led-astray": CanadaLedAstray,
  "canada-drive-thru-line": CanadaDriveThruLine,
  "canada-ice-storm-outage": CanadaIceStormOutage,
  "ukraine-bazaar-pickpocket": UkraineBazaarPickpocket,
  "ukraine-hrad": UkraineHrad,
  "ukraine-lisovyk-stezhka": UkraineLisovykStezhka,
  "ukraine-povin": UkrainePovin,
  "ukraine-stepova-pozhezha": UkraineStepovaPozhezha,
  "ukraine-tamada-obov-yazok": UkraineTamadaObovYazok,
  "ukraine-zamitil": UkraineZamitil,
  "brazil-arrastao": BrazilArrastao,
  "brazil-conta-atrasada": BrazilContaAtrasada,
  "brazil-deslizamento": BrazilDeslizamento,
  "brazil-enchente": BrazilEnchente,
  "brazil-greve-onibus": BrazilGreveOnibus,
  "brazil-redemoinho": BrazilRedemoinho,
  "brazil-rodada-boteco": BrazilRodadaBoteco,
  "australia-bogged": AustraliaBogged,
  "australia-bushfire": AustraliaBushfire,
  "australia-coastalcyclone": AustraliaCoastalCyclone,
  "australia-huntsman": AustraliaHuntsman,
  "australia-magpieswoop": AustraliaMagpieSwoop,
  "australia-shout": AustraliaShout,
  "australia-sunburn": AustraliaSunburn,
  "solarsystem-solarflare": SolarsystemSolarflare,
  "solarsystem-debris": SolarsystemDebris,
  "solarsystem-commblackout": SolarsystemCommblackout,
  "solarsystem-gravityassistfail": SolarsystemGravityassistfail,
  "solarsystem-radiationbelt": SolarsystemRadiationbelt,
  "solarsystem-duststorm": SolarsystemDuststorm,
  "solarsystem-fuelshortage": SolarsystemFuelshortage,
  "hyakumeizan-kirimayoi": HyakumeizanKirimayoi,
  "hyakumeizan-rakurai": HyakumeizanRakurai,
  "hyakumeizan-kumadeai": HyakumeizanKumadeai,
  "hyakumeizan-hachisasare": HyakumeizanHachisasare,
  "hyakumeizan-manshitsu": HyakumeizanManshitsu,
  "hyakumeizan-korogashi": HyakumeizanKorogashi,
  "hyakumeizan-tengukakushi": HyakumeizanTengukakushi,
  "europe-lawine": EuropeLawine,
  "europe-hitzewelle": EuropeHitzewelle,
  "europe-greve-continentale": EuropeGreveContinentale,
  "europe-nebel": EuropeNebel,
  "europe-herbstlaub": EuropeHerbstlaub,
  "europe-waldbrand": EuropeWaldbrand,
  "europe-grenzstau": EuropeGrenzstau,
  "northamerica-hurricane": NorthamericaHurricane,
  "northamerica-hielo": NorthamericaHielo,
  "northamerica-cenizas": NorthamericaCenizas,
  "northamerica-ventisca": NorthamericaVentisca,
  "northamerica-sombreron-trenza": NorthamericaSombreronTrenza,
  "northamerica-aduana": NorthamericaAduana,
  "northamerica-pickpocket-mercado": NorthamericaPickpocketMercado,
  "southamerica-aduana-sudamericana": SouthamericaAduanaSudamericana,
  "southamerica-bloqueo-sudamericano": SouthamericaBloqueoSudamericano,
  "southamerica-camanchaca": SouthamericaCamanchaca,
  "southamerica-creciente": SouthamericaCreciente,
  "southamerica-huayco": SouthamericaHuayco,
  "southamerica-tunchesilba": SouthamericaTunchesilba,
  "southamerica-zonda": SouthamericaZonda,
  "asia-sandstorm": AsiaSandstorm,
  "asia-monsoonwash": AsiaMonsoonwash,
  "asia-avalanche": AsiaAvalanche,
  "asia-railbuckle": AsiaRailbuckle,
  "asia-customsdelay": AsiaCustomsdelay,
  "asia-bazaarpickpocket": AsiaBazaarpickpocket,
  "asia-powercut": AsiaPowercut,

  "africa-harmattan": AfricaHarmattan,
  "africa-washout": AfricaWashout,
  "africa-borderclosed": AfricaBorderclosed,
  "africa-gaugebreak": AfricaGaugebreak,
  "africa-checkpoint": AfricaCheckpoint,
  "africa-wildlifedetour": AfricaWildlifedetour,
  "africa-coppertheft": AfricaCoppertheft,
  "egypt-khamsin": EgyptKhamsin,
  "egypt-canalblock": EgyptCanalblock,
  "egypt-heatbuckle": EgyptHeatbuckle,
  "egypt-ferryoverload": EgyptFerryoverload,
  "egypt-zaffa": EgyptZaffa,
  "egypt-blackout": EgyptBlackout,
  "egypt-scenicroute": EgyptScenicroute,
  "peru-sorochazo": PeruSorochazo,
  "peru-friaje": PeruFriaje,
  "peru-llama-terca": PeruLlamaTerca,
  "peru-derrumbe-mina": PeruDerrumbeMina,
  "peru-cacho-perdido": PeruCachoPerdido,
  "peru-neblina-puna": PeruNeblinaPuna,
  "peru-robo-terminal": PeruRoboTerminal,
};

/** その国のその災難の絵。無ければ undefined。 */
export function doomAnimationFor(countryId: string, doomId: string): ComponentType | undefined {
  return DOOM_ANIMATIONS[`${countryId}-${doomId}`];
}
