import { ComponentType } from "react";
import { AppleOrchard } from "./apple-orchard";
import { AwamoriRound } from "./awamori-round";
import { BackwaterDetour } from "./backwater-detour";
import { BerthSupplement } from "./berth-supplement";
import { BloqueoDetour } from "./bloqueo-detour";
import { BrazilNutFind } from "./brazil-nut-find";
import { CarnivalWater } from "./carnival-water";
import { ChacoHeat } from "./chaco-heat";
import { ChaiRefusedPayment } from "./chai-refused-payment";
import { ChasseCroise } from "./chasse-croise";
import { CherryBlossomSpot } from "./cherry-blossom-spot";
import { CholitaMarket } from "./cholita-market";
import { CidreAuPressoir } from "./cidre-au-pressoir";
import { CoffeeHarvest } from "./coffee-harvest";
import { ColFerme } from "./col-ferme";
import { CoupDeVentManche } from "./coup-de-vent-manche";
import { Crachin } from "./crachin";
import { CraftCommission } from "./craft-commission";
import { CrowdedCarriageTheft } from "./crowded-carriage-theft";
import { CrueDeLaSeine } from "./crue-de-la-seine";
import { DabbawalaTip } from "./dabbawala-tip";
import { DeathRoadBrakes } from "./death-road-brakes";
import { DeckPassage } from "./deck-passage";
import { DeerCrackers } from "./deer-crackers";
import { Desalpe } from "./desalpe";
import { DesertHospitality } from "./desert-hospitality";
import { DhowCargo } from "./dhow-cargo";
import { DriftIceCruise } from "./drift-ice-cruise";
import { FilmExtra } from "./film-extra";
import { FloodFerry } from "./flood-ferry";
import { GhatBoatman } from "./ghat-boatman";
import { HammockDeck } from "./hammock-deck";
import { HarmattanDust } from "./harmattan-dust";
import { HarvestRunNorth } from "./harvest-run-north";
import { IslandFreight } from "./island-freight";
import { JourDeMarche } from "./jour-de-marche";
import { Kuidaore } from "./kuidaore";
import { LandslidePass } from "./landslide-pass";
import { LavandeDistillation } from "./lavande-distillation";
import { LicensedPitch } from "./licensed-pitch";
import { LostWalletReturned } from "./lost-wallet-returned";
import { MatsuriHelp } from "./matsuri-help";
import { MissionConcert } from "./mission-concert";
import { MonasteryHospitality } from "./monastery-hospitality";
import { MonkeySnatch } from "./monkey-snatch";
import { MonsoonFerriesStop } from "./monsoon-ferries-stop";
import { MonsoonFloodedStreet } from "./monsoon-flooded-street";
import { NamahageVisit } from "./namahage-visit";
import { NightMarketShift } from "./night-market-shift";
import { OnsenRyokan } from "./onsen-ryokan";
import { OrageDeGrele } from "./orage-de-grele";
import { PachamamaOffering } from "./pachamama-offering";
import { ParcelHome } from "./parcel-home";
import { PeageAutoroute } from "./peage-autoroute";
import { PecheAPied } from "./peche-a-pied";
import { PickingByTheBin } from "./picking-by-the-bin";
import { RiverBoatWait } from "./river-boat-wait";
import { RoadWashedOut } from "./road-washed-out";
import { RoofSnowClearing } from "./roof-snow-clearing";
import { RushHourCrush } from "./rush-hour-crush";
import { SalmonCatch } from "./salmon-catch";
import { SaltFlatGuide } from "./salt-flat-guide";
import { SandstormRepair } from "./sandstorm-repair";
import { ShiretokoBear } from "./shiretoko-bear";
import { ShrineOmikuji } from "./shrine-omikuji";
import { SnowCountryInn } from "./snow-country-inn";
import { SnowDerailment } from "./snow-derailment";
import { Soroche } from "./soroche";
import { StandingBetween } from "./standing-between";
import { TaxeDeSejour } from "./taxe-de-sejour";
import { TeaGardenWork } from "./tea-garden-work";
import { TempleMeal } from "./temple-meal";
import { TipNotOnTheBill } from "./tip-not-on-the-bill";
import { TitreRestaurant } from "./titre-restaurant";
import { TournageAParis } from "./tournage-a-paris";
import { TrainDelayTaxi } from "./train-delay-taxi";
import { TrainTatkalFee } from "./train-tatkal-fee";
import { TruffeLalbenque } from "./truffe-lalbenque";
import { VendingChange } from "./vending-change";
import { VisaAtTheWindow } from "./visa-at-the-window";
import { VolcanicAsh } from "./volcanic-ash";
import { WeddingInvitation } from "./wedding-invitation";
import { YataiTreat } from "./yatai-treat";
import { ZebraCrossing } from "./zebra-crossing";

/**
 * 出来事ID → 動く絵。
 *
 * 1件1ファイルにしてここで束ねる。絵は自己完結したSVG(外部の画像もライブラリも
 * 使わない)で、`prefers-reduced-motion` が有効なときは動きを止める。
 * 作り方は docs/50-authoring/02-animation-guide.md を参照。
 *
 * **このファイルは足し忘れを防ぐため機械的に整えている。**
 */
export const EVENT_ANIMATIONS: Readonly<Record<string, ComponentType>> = {
  "apple-orchard": AppleOrchard,
  "awamori-round": AwamoriRound,
  "backwater-detour": BackwaterDetour,
  "berth-supplement": BerthSupplement,
  "bloqueo-detour": BloqueoDetour,
  "brazil-nut-find": BrazilNutFind,
  "carnival-water": CarnivalWater,
  "chaco-heat": ChacoHeat,
  "chai-refused-payment": ChaiRefusedPayment,
  "chasse-croise": ChasseCroise,
  "cherry-blossom-spot": CherryBlossomSpot,
  "cholita-market": CholitaMarket,
  "cidre-au-pressoir": CidreAuPressoir,
  "coffee-harvest": CoffeeHarvest,
  "col-ferme": ColFerme,
  "coup-de-vent-manche": CoupDeVentManche,
  "crachin": Crachin,
  "craft-commission": CraftCommission,
  "crowded-carriage-theft": CrowdedCarriageTheft,
  "crue-de-la-seine": CrueDeLaSeine,
  "dabbawala-tip": DabbawalaTip,
  "death-road-brakes": DeathRoadBrakes,
  "deck-passage": DeckPassage,
  "deer-crackers": DeerCrackers,
  "desalpe": Desalpe,
  "desert-hospitality": DesertHospitality,
  "dhow-cargo": DhowCargo,
  "drift-ice-cruise": DriftIceCruise,
  "film-extra": FilmExtra,
  "flood-ferry": FloodFerry,
  "ghat-boatman": GhatBoatman,
  "hammock-deck": HammockDeck,
  "harmattan-dust": HarmattanDust,
  "harvest-run-north": HarvestRunNorth,
  "island-freight": IslandFreight,
  "jour-de-marche": JourDeMarche,
  "kuidaore": Kuidaore,
  "landslide-pass": LandslidePass,
  "lavande-distillation": LavandeDistillation,
  "licensed-pitch": LicensedPitch,
  "lost-wallet-returned": LostWalletReturned,
  "matsuri-help": MatsuriHelp,
  "mission-concert": MissionConcert,
  "monastery-hospitality": MonasteryHospitality,
  "monkey-snatch": MonkeySnatch,
  "monsoon-ferries-stop": MonsoonFerriesStop,
  "monsoon-flooded-street": MonsoonFloodedStreet,
  "namahage-visit": NamahageVisit,
  "night-market-shift": NightMarketShift,
  "onsen-ryokan": OnsenRyokan,
  "orage-de-grele": OrageDeGrele,
  "pachamama-offering": PachamamaOffering,
  "parcel-home": ParcelHome,
  "peage-autoroute": PeageAutoroute,
  "peche-a-pied": PecheAPied,
  "picking-by-the-bin": PickingByTheBin,
  "river-boat-wait": RiverBoatWait,
  "road-washed-out": RoadWashedOut,
  "roof-snow-clearing": RoofSnowClearing,
  "rush-hour-crush": RushHourCrush,
  "salmon-catch": SalmonCatch,
  "salt-flat-guide": SaltFlatGuide,
  "sandstorm-repair": SandstormRepair,
  "shiretoko-bear": ShiretokoBear,
  "shrine-omikuji": ShrineOmikuji,
  "snow-country-inn": SnowCountryInn,
  "snow-derailment": SnowDerailment,
  "soroche": Soroche,
  "standing-between": StandingBetween,
  "taxe-de-sejour": TaxeDeSejour,
  "tea-garden-work": TeaGardenWork,
  "temple-meal": TempleMeal,
  "tip-not-on-the-bill": TipNotOnTheBill,
  "titre-restaurant": TitreRestaurant,
  "tournage-a-paris": TournageAParis,
  "train-delay-taxi": TrainDelayTaxi,
  "train-tatkal-fee": TrainTatkalFee,
  "truffe-lalbenque": TruffeLalbenque,
  "vending-change": VendingChange,
  "visa-at-the-window": VisaAtTheWindow,
  "volcanic-ash": VolcanicAsh,
  "wedding-invitation": WeddingInvitation,
  "yatai-treat": YataiTreat,
  "zebra-crossing": ZebraCrossing,
};
