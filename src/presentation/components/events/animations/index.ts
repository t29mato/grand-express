import { ComponentType } from "react";
import { AppleOrchard } from "./apple-orchard";
import { AwamoriRound } from "./awamori-round";
import { BackwaterDetour } from "./backwater-detour";
import { BearAttack } from "./bear-attack";
import { BloqueoDetour } from "./bloqueo-detour";
import { BrazilNutFind } from "./brazil-nut-find";
import { CarnivalWater } from "./carnival-water";
import { ChacoHeat } from "./chaco-heat";
import { ChaiRefusedPayment } from "./chai-refused-payment";
import { CherryBlossomSpot } from "./cherry-blossom-spot";
import { CholitaMarket } from "./cholita-market";
import { CoffeeHarvest } from "./coffee-harvest";
import { CraftCommission } from "./craft-commission";
import { CrowdedCarriageTheft } from "./crowded-carriage-theft";
import { DabbawalaTip } from "./dabbawala-tip";
import { DeathRoadBrakes } from "./death-road-brakes";
import { DeerCrackers } from "./deer-crackers";
import { DesertHospitality } from "./desert-hospitality";
import { DriftIceCruise } from "./drift-ice-cruise";
import { FilmExtra } from "./film-extra";
import { FloodFerry } from "./flood-ferry";
import { GhatBoatman } from "./ghat-boatman";
import { Kuidaore } from "./kuidaore";
import { LandslidePass } from "./landslide-pass";
import { LostWalletReturned } from "./lost-wallet-returned";
import { MatsuriHelp } from "./matsuri-help";
import { MissionConcert } from "./mission-concert";
import { MonasteryHospitality } from "./monastery-hospitality";
import { MonkeySnatch } from "./monkey-snatch";
import { MonsoonFloodedStreet } from "./monsoon-flooded-street";
import { NamahageVisit } from "./namahage-visit";
import { OnsenRyokan } from "./onsen-ryokan";
import { PachamamaOffering } from "./pachamama-offering";
import { RiverBoatWait } from "./river-boat-wait";
import { RushHourCrush } from "./rush-hour-crush";
import { SalmonCatch } from "./salmon-catch";
import { SaltFlatGuide } from "./salt-flat-guide";
import { SandstormRepair } from "./sandstorm-repair";
import { ShrineOmikuji } from "./shrine-omikuji";
import { Soroche } from "./soroche";
import { TeaGardenWork } from "./tea-garden-work";
import { TempleMeal } from "./temple-meal";
import { TrainDelayTaxi } from "./train-delay-taxi";
import { TrainTatkalFee } from "./train-tatkal-fee";
import { VendingChange } from "./vending-change";
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
 * **このファイルは足し忘れを防ぐため機械的に整えている。** 絵を足したら
 * ここにも1行足すこと(登録が無い出来事は増減だけを示す汎用の絵になる)。
 */
export const EVENT_ANIMATIONS: Readonly<Record<string, ComponentType>> = {
  "apple-orchard": AppleOrchard,
  "awamori-round": AwamoriRound,
  "backwater-detour": BackwaterDetour,
  "bloqueo-detour": BloqueoDetour,
  "brazil-nut-find": BrazilNutFind,
  "carnival-water": CarnivalWater,
  "chaco-heat": ChacoHeat,
  "chai-refused-payment": ChaiRefusedPayment,
  "cherry-blossom-spot": CherryBlossomSpot,
  "cholita-market": CholitaMarket,
  "coffee-harvest": CoffeeHarvest,
  "craft-commission": CraftCommission,
  "crowded-carriage-theft": CrowdedCarriageTheft,
  "dabbawala-tip": DabbawalaTip,
  "death-road-brakes": DeathRoadBrakes,
  "deer-crackers": DeerCrackers,
  "desert-hospitality": DesertHospitality,
  "drift-ice-cruise": DriftIceCruise,
  "film-extra": FilmExtra,
  "flood-ferry": FloodFerry,
  "ghat-boatman": GhatBoatman,
  "kuidaore": Kuidaore,
  "landslide-pass": LandslidePass,
  "lost-wallet-returned": LostWalletReturned,
  "matsuri-help": MatsuriHelp,
  "mission-concert": MissionConcert,
  "monastery-hospitality": MonasteryHospitality,
  "monkey-snatch": MonkeySnatch,
  "monsoon-flooded-street": MonsoonFloodedStreet,
  "namahage-visit": NamahageVisit,
  "onsen-ryokan": OnsenRyokan,
  "pachamama-offering": PachamamaOffering,
  "river-boat-wait": RiverBoatWait,
  "rush-hour-crush": RushHourCrush,
  "salmon-catch": SalmonCatch,
  "salt-flat-guide": SaltFlatGuide,
  "sandstorm-repair": SandstormRepair,
  "shiretoko-bear": BearAttack,
  "shrine-omikuji": ShrineOmikuji,
  "soroche": Soroche,
  "tea-garden-work": TeaGardenWork,
  "temple-meal": TempleMeal,
  "train-delay-taxi": TrainDelayTaxi,
  "train-tatkal-fee": TrainTatkalFee,
  "vending-change": VendingChange,
  "volcanic-ash": VolcanicAsh,
  "wedding-invitation": WeddingInvitation,
  "yatai-treat": YataiTreat,
  "zebra-crossing": ZebraCrossing,
};
