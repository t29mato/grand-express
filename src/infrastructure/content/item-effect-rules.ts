/**
 * legacy/grand-express.html の `itemHandler` は、アイテムキー文字列を直接
 * if/elseで分岐して効果を実行していた。ここでキーごとの効果をデータとして
 * 書き起こす(ADR-0007と同じ理由: ロジックをコードからデータへ)。
 *
 * 対応関係は legacy/grand-express.html の `humanAction`/`cpuItems` を
 * 読んで書き起こしたもの。両国ともキーは異なるが効果の種類は共通。
 *
 * 各国に1つある移動アイテム(気球・飛行機など)だけは legacy と効果が違う。
 * legacy は目的地への瞬間移動だったが、確実に着けるとサイコロを振る意味が
 * 無くなるため、`carried-far`(8〜12マス進むが向きは選べない)に置き換えた。
 * 8〜12は、サイコロ3個振り(3〜18・平均10.5)と同じくらい大きく動きつつ、
 * 向きが選べないぶん博打になる幅として決めている。
 */
import { ItemEffect } from "../../domain/item/item";

export const ITEM_EFFECT_BY_LEGACY_KEY: Readonly<Record<string, ItemEffect>> = {
  // Bolivia
  ekeko: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  pass: { type: "choose-exact-dice" },
  ferro: { type: "roll-fixed-dice", diceCount: 2 },
  coca: { type: "none" }, // 厄災の神のward item(passive)。発動抑止は別ロジックで自動処理。
  challa: { type: "repel-spirit" },
  pacha: { type: "quiz-save" }, // クイズ不正解時に自動消費され正解扱いになる(人間のみ)
  zebra: { type: "extra-turn" },
  expreso: { type: "roll-fixed-dice", diceCount: 3 },
  singani: { type: "gain-cash", amount: 380 },
  // Japan
  hikouki: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  taxi: { type: "choose-exact-dice" },
  shinkansen: { type: "roll-fixed-dice", diceCount: 2 },
  omamori: { type: "none" }, // 厄災の神のward item(passive)
  morishio: { type: "repel-spirit" },
  daruma: { type: "quiz-save" },
  nozomi: { type: "roll-fixed-dice", diceCount: 3 },
  manekineko: { type: "gain-cash", amount: 380 },
  tasuki: { type: "extra-turn" },
  // India(legacy由来ではなく、このリポジトリで書き起こした国)
  garuda: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  tatkal: { type: "choose-exact-dice" },
  rajdhani: { type: "roll-fixed-dice", diceCount: 2 },
  vandebharat: { type: "roll-fixed-dice", diceCount: 3 },
  nimbumirchi: { type: "none" }, // 厄災の神のward item(passive)
  neem: { type: "repel-spirit" },
  panchang: { type: "quiz-save" },
  jugaad: { type: "gain-cash", amount: 380 },
  dabbawala: { type: "extra-turn" },
  // France
  montgolfiere: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chaix: { type: "choose-exact-dice" },
  corail: { type: "roll-fixed-dice", diceCount: 2 },
  tgv: { type: "roll-fixed-dice", diceCount: 3 },
  buis: { type: "none" }, // 厄災の神のward item(passive)
  feustjean: { type: "repel-spirit" },
  antiseche: { type: "quiz-save" },
  brocante: { type: "gain-cash", amount: 380 },
  relais: { type: "extra-turn" },
  // World
  zeppelin: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chronometer: { type: "choose-exact-dice" },
  mailsteamer: { type: "roll-fixed-dice", diceCount: 2 },
  blueriband: { type: "roll-fixed-dice", diceCount: 3 },
  christopher: { type: "none" }, // 厄災の神のward item(passive)
  elmo: { type: "repel-spirit" },
  baedeker: { type: "quiz-save" },
  posterestante: { type: "gain-cash", amount: 380 },
  dateline: { type: "extra-turn" },
  // Ibaraki(県単位の盤面。国と同じ仕組みで動く)
  hobiki: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jikokuhyo: { type: "choose-exact-dice" },
  tokiwa: { type: "roll-fixed-dice", diceCount: 2 },
  tsukubaex: { type: "roll-fixed-dice", diceCount: 3 },
  ookushigai: { type: "none" }, // 厄災の神(ダイダラボウ)のward item(passive)
  kashimatachi: { type: "repel-spirit" },
  kodokan: { type: "quiz-save" },
  kasamayaki: { type: "gain-cash", amount: 380 },
  gamanoabura: { type: "extra-turn" },
  // Korea
  hak: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  yeot: { type: "choose-exact-dice" },
  mugunghwa: { type: "roll-fixed-dice", diceCount: 2 },
  ktx: { type: "roll-fixed-dice", diceCount: 3 },
  patjuk: { type: "none" }, // 厄災の神(トッケビ)のward item(passive)
  bujeok: { type: "repel-spirit" },
  jokbo: { type: "quiz-save" },
  yeopjeon: { type: "gain-cash", amount: 380 },
  ppalli: { type: "extra-turn" },

  // Turkey
  balon: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fal: { type: "choose-exact-dice" },
  mavitren: { type: "roll-fixed-dice", diceCount: 2 },
  yht: { type: "roll-fixed-dice", diceCount: 3 },
  nazar: { type: "none" }, // 厄災の神(カラコンジョロス)を退ける護符。持っているだけで効く
  karacevap: { type: "repel-spirit" },
  deneme: { type: "quiz-save" },
  akce: { type: "gain-cash", amount: 380 },
  dolmus: { type: "extra-turn" },

  // Germany
  zeppelinfahrt: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  fahrplan: { type: "choose-exact-dice" },
  intercity: { type: "roll-fixed-dice", diceCount: 2 },
  ice: { type: "roll-fixed-dice", diceCount: 3 },
  kaminkehrer: { type: "none" }, // 厄災の神(リューベツァール)のward item(passive)
  almglocke: { type: "repel-spirit" },
  eselsbruecke: { type: "quiz-save" },
  flohmarkt: { type: "gain-cash", amount: 380 },
  autobahn: { type: "extra-turn" },

  // China
  jindouyun: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  luopan: { type: "choose-exact-dice" },
  lupiheche: { type: "roll-fixed-dice", diceCount: 2 },
  gaotiepiao: { type: "roll-fixed-dice", diceCount: 3 },
  baozhu: { type: "none" }, // 厄災の神(年獣)のward item(passive)
  taomujian: { type: "repel-spirit" },
  jinnang: { type: "quiz-save" },
  yuzhuo: { type: "gain-cash", amount: 380 },
  qianlima: { type: "extra-turn" },

  // UK
  girdle: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  osmap: { type: "choose-exact-dice" },
  nightriviera: { type: "roll-fixed-dice", diceCount: 2 },
  scotsman: { type: "roll-fixed-dice", diceCount: 3 },
  horseshoe: { type: "none" }, // 厄災の神(ボガート)のward item(passive)
  rowan: { type: "repel-spirit" },
  pubquiz: { type: "quiz-save" },
  detectorist: { type: "gain-cash", amount: 380 },
  guardswhistle: { type: "extra-turn" },

  // Italy
  // **`intercity` はドイツと共用。**インターシティはヨーロッパ各国を走る列車の
  // 名前なので、盤面が違っても同じ鍵になった。効果も同じ(サイコロ2個)なので
  // 1つにまとめてある。名前と絵は盤面ごとの内容から引くので、画面上は別物に見える。
  vespa: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  orario: { type: "choose-exact-dice" },
  frecciarossa: { type: "roll-fixed-dice", diceCount: 3 },
  cornicello: { type: "none" }, // 厄災の神(モナチェッロ)のward item(passive)
  malocchio: { type: "repel-spirit" },
  bigino: { type: "quiz-save" },
  lotteria: { type: "gain-cash", amount: 380 },
  raccomandazione: { type: "extra-turn" },

  // Russia
  troika: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  raspisanie: { type: "choose-exact-dice" },
  platskart: { type: "roll-fixed-dice", diceCount: 2 },
  sapsan: { type: "roll-fixed-dice", diceCount: 3 },
  khlebsol: { type: "none" }, // 厄災の神(ドモヴォイ)のward item(passive)
  sol: { type: "repel-spirit" },
  shpargalka: { type: "quiz-save" },
  gosloto: { type: "gain-cash", amount: 380 },
  blat: { type: "extra-turn" },

  // USA
  greyhound: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  roadatlas: { type: "choose-exact-dice" },
  amtrakcoach: { type: "roll-fixed-dice", diceCount: 2 },
  acela: { type: "roll-fixed-dice", diceCount: 3 },
  rabbitfoot: { type: "none" }, // 厄災の神(グレムリン)のward item(passive)
  luckypenny: { type: "repel-spirit" },
  cribsheet: { type: "quiz-save" },
  lotteryticket: { type: "gain-cash", amount: 380 },
  roadtrip: { type: "extra-turn" },

  // Indonesia
  ojek: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jadwalkereta: { type: "choose-exact-dice" },
  eksekutif: { type: "roll-fixed-dice", diceCount: 2 },
  argobromo: { type: "roll-fixed-dice", diceCount: 3 },
  jimat: { type: "none" }, // 厄災の神(トゥユル)のward item(passive)
  kemenyan: { type: "repel-spirit" },
  contekan: { type: "quiz-save" },
  rejeki: { type: "gain-cash", amount: 380 },
  kenalan: { type: "extra-turn" },

  // Morocco
  mobylette: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  horaire: { type: "choose-exact-dice" },
  rapide: { type: "roll-fixed-dice", diceCount: 2 },
  alboraq: { type: "roll-fixed-dice", diceCount: 3 },
  khamsa: { type: "none" }, // 厄災の神(戸口のジュヌーン)のward item(passive)
  bakhour: { type: "repel-spirit" },
  fiche: { type: "quiz-save" },
  zerbia: { type: "gain-cash", amount: 380 },
  wasta: { type: "extra-turn" },

  // Ghana
  kwahu: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  adae: { type: "choose-exact-dice" },
  trotro: { type: "roll-fixed-dice", diceCount: 2 },
  motorway: { type: "roll-fixed-dice", diceCount: 3 },
  sankofa: { type: "none" }, // 厄災の神(アナンシ)のward item(passive)
  libation: { type: "repel-spirit" },
  expo: { type: "quiz-save" },
  lotto: { type: "gain-cash", amount: 380 },
  okyeame: { type: "extra-turn" },

  // Bali
  // **`ojek` はインドネシアと共用。**バイクタクシーはインドネシア中で
  // 同じ呼び名なので、盤面が違っても同じ鍵になった。効果も同じなので1つに
  // まとめてある(ドイツとイタリアの `intercity` と同じ事情)。
  padewasan: { type: "choose-exact-dice" },
  bemo: { type: "roll-fixed-dice", diceCount: 2 },
  perama: { type: "roll-fixed-dice", diceCount: 3 },
  tridatu: { type: "none" }, // 厄災の神(レヤック)のward item(passive)
  keris: { type: "repel-spirit" },
  lontar: { type: "quiz-save" },
  perak: { type: "gain-cash", amount: 380 },
  kecak: { type: "extra-turn" },

  // Malaysia
  beca: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  jadual: { type: "choose-exact-dice" },
  ets: { type: "roll-fixed-dice", diceCount: 2 },
  platinum: { type: "roll-fixed-dice", diceCount: 3 },
  azimat: { type: "none" }, // 厄災の神(トヨル)のward item(passive)
  jampi: { type: "repel-spirit" },
  bocoran: { type: "quiz-save" },
  durianruntuh: { type: "gain-cash", amount: 380 },
  orangdalam: { type: "extra-turn" },
  // Venezuela
  condor: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  animalito: { type: "choose-exact-dice" },
  porpuesto: { type: "roll-fixed-dice", diceCount: 2 },
  metro: { type: "roll-fixed-dice", diceCount: 3 },
  tabaco: { type: "none" }, // 厄災の神(エル・シルボン)を遠ざける護符。効果は持っているだけで働く
  ruda: { type: "repel-spirit" },
  chuleta: { type: "quiz-save" },
  billete: { type: "gain-cash", amount: 240 },
  mototaxi: { type: "extra-turn" },

  // Canada
  bushplane: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  portage: { type: "choose-exact-dice" },
  oceantrain: { type: "roll-fixed-dice", diceCount: 2 },
  canadianrail: { type: "roll-fixed-dice", diceCount: 3 },
  bearbells: { type: "none" }, // 厄災の神(サスクワッチ)のward item(passive)
  bearspray: { type: "repel-spirit" },
  almanac: { type: "quiz-save" },
  loonie: { type: "gain-cash", amount: 380 },
  doubledouble: { type: "extra-turn" },

  // Ukraine
  leleka: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  vinok: { type: "choose-exact-dice" },
  elektrychka: { type: "roll-fixed-dice", diceCount: 2 },
  shvydkisnyi: { type: "roll-fixed-dice", diceCount: 3 },
  rushnyk: { type: "none" }, // 厄災の神(リソヴィク)のward item(passive)
  sil: { type: "repel-spirit" },
  shpora: { type: "quiz-save" },
  karbovanets: { type: "gain-cash", amount: 380 },
  marshrutka: { type: "extra-turn" },

  // Brazil
  arara: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  horacerta: { type: "choose-exact-dice" },
  mariafumaca: { type: "roll-fixed-dice", diceCount: 2 },
  trembala: { type: "roll-fixed-dice", diceCount: 3 },
  figa: { type: "none" }, // 厄災の神(サシ・ペレレ)のward item(passive)
  defumacao: { type: "repel-spirit" },
  cola: { type: "quiz-save" },
  bicho: { type: "gain-cash", amount: 380 },
  atalho: { type: "extra-turn" },

  // Australia
  willywilly: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  swag: { type: "choose-exact-dice" },
  roadtrain: { type: "roll-fixed-dice", diceCount: 2 },
  ghanticket: { type: "roll-fixed-dice", diceCount: 3 },
  vegemite: { type: "none" }, // 厄災の神(バニップ)のward item(passive)
  canetoad: { type: "repel-spirit" },
  speewah: { type: "quiz-save" },
  cupsweep: { type: "gain-cash", amount: 380 },
  twoup: { type: "extra-turn" },

  // Solar System
  gravassist: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  ionburn: { type: "choose-exact-dice" },
  solarsail: { type: "roll-fixed-dice", diceCount: 2 },
  fusiondrive: { type: "roll-fixed-dice", diceCount: 3 },
  shieldplating: { type: "none" }, // 厄災の神(スクラップ・スプライト)のward item(passive)
  distressflare: { type: "repel-spirit" },
  missionuplink: { type: "quiz-save" },
  salvagepod: { type: "gain-cash", amount: 380 },
  overclock: { type: "extra-turn" },

  // Hyakumeizan
  kyuujoheri: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  chikeizu: { type: "choose-exact-dice" },
  tozanbus: { type: "roll-fixed-dice", diceCount: 2 },
  yakoubus: { type: "roll-fixed-dice", diceCount: 3 },
  // bearbells は既存(カナダ)と同じ鍵・同じ効果なので追記不要(確認のみ)
  // bearspray も既存(カナダ)と同じ鍵・同じ効果なので追記不要(確認のみ)
  yamachizu: { type: "quiz-save" },
  matsutake: { type: "gain-cash", amount: 380 },
  raicho: { type: "extra-turn" },

  // Europe
  interrail: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  bradshaw: { type: "choose-exact-dice" },
  eurocity: { type: "roll-fixed-dice", diceCount: 2 },
  eurostar: { type: "roll-fixed-dice", diceCount: 3 },
  rauhnachtskreide: { type: "none" }, // 厄災の神(クランプス)のward item(passive)
  schnapsflasche: { type: "repel-spirit" },
  phrasebook: { type: "quiz-save" },
  wechselstube: { type: "gain-cash", amount: 380 },
  laissezpasser: { type: "extra-turn" },

  // North America
  boxcar: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  officialguide: { type: "choose-exact-dice" },
  zephyr: { type: "roll-fixed-dice", diceCount: 2 },
  superchief: { type: "roll-fixed-dice", diceCount: 3 },
  worrydoll: { type: "none" }, // 厄災の神(エル・ソンブレロン)のward item(passive)
  cintaroja: { type: "repel-spirit" },
  cliffsnotes: { type: "quiz-save" },
  pieceseight: { type: "gain-cash", amount: 380 },
  handcar: { type: "extra-turn" },

  // South America
  harpia: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  salvoconducto: { type: "choose-exact-dice" },
  trasandino: { type: "roll-fixed-dice", diceCount: 2 },
  alasnubes: { type: "roll-fixed-dice", diceCount: 3 },
  ojodevenado: { type: "none" }, // 厄災の神(エル・トゥンチェ)のward item(passive)
  palosanto: { type: "repel-spirit" },
  amauta: { type: "quiz-save" },
  escudo: { type: "gain-cash", amount: 380 },
  sacoleiro: { type: "extra-turn" },

  // Asia
  relay: { type: "extra-turn" },
  magiccarpet: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  bogie: { type: "choose-exact-dice" },
  caravanserairest: { type: "none" }, // 厄災の神(時刻表に無い列車)のward item(passive)
  silkbolt: { type: "gain-cash", amount: 380 },
  waybill: { type: "quiz-save" },
  teabrick: { type: "roll-fixed-dice", diceCount: 2 },
  sleeperticket: { type: "roll-fixed-dice", diceCount: 3 },
  firman: { type: "repel-spirit" },

  // Mexico
  globo: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  brujula: { type: "choose-exact-dice" },
  chepe: { type: "roll-fixed-dice", diceCount: 2 },
  trenmaya: { type: "roll-fixed-dice", diceCount: 3 },
  copal: { type: "none" },
  silbato: { type: "repel-spirit" },
  acordeon: { type: "quiz-save" },
  centenario: { type: "gain-cash", amount: 380 },
  chapulin: { type: "extra-turn" },
  // Spain
  encierro: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  itinerario: { type: "choose-exact-dice" },
  talgo: { type: "roll-fixed-dice", diceCount: 2 },
  ave: { type: "roll-fixed-dice", diceCount: 3 },
  azabache: { type: "none" }, // 厄災の神(トラスグ)のward item(passive)
  esquila: { type: "repel-spirit" },
  apuntes: { type: "quiz-save" },
  decimo: { type: "gain-cash", amount: 380 },
  carajillo: { type: "extra-turn" },
// New Zealand
roaringforties: { type: "carried-far", minSteps: 8, maxSteps: 12 },
starcompass: { type: "choose-exact-dice" },
tuisong: { type: "roll-fixed-dice", diceCount: 2 },
northernexplorer: { type: "roll-fixed-dice", diceCount: 3 },
heitiki: { type: "none" }, // 厄災の神(タニファ)のward item(passive)
taniwhaoffering: { type: "repel-spirit" },
correspondence: { type: "quiz-save" },
kauirgum: { type: "gain-cash", amount: 380 },
jandalsprint: { type: "extra-turn" },
  // Africa
  telegraphslip: { type: "extra-turn" },
  dhowpassage: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  gaugechit: { type: "choose-exact-dice" },
  resthousevoucher: { type: "none" }, // 厄災の神(繋がらなかった線)のward item(passive)
  kolanuts: { type: "gain-cash", amount: 260 },
  goldweight: { type: "quiz-save" },
  coffeesack: { type: "roll-fixed-dice", diceCount: 2 },
  orewagonslip: { type: "roll-fixed-dice", diceCount: 3 },
  trackwalkerlantern: { type: "repel-spirit" },
  // Egypt
  feluccawind: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  camelpace: { type: "choose-exact-dice" },
  microbusride: { type: "roll-fixed-dice", diceCount: 2 },
  deserthighspeed: { type: "roll-fixed-dice", diceCount: 3 },
  ironnail: { type: "none" }, // 厄災の神(ナダーハ)のward item(passive)
  saltoveshoulder: { type: "repel-spirit" },
  thanaweyaguide: { type: "quiz-save" },
  oldpiastres: { type: "gain-cash", amount: 260 },
  telegraphsprint: { type: "extra-turn" },
  // Peru
  avioneta: { type: "carried-far", minSteps: 8, maxSteps: 12 },
  combi: { type: "choose-exact-dice" },
  trenmacho: { type: "roll-fixed-dice", diceCount: 2 },
  expresoandino: { type: "roll-fixed-dice", diceCount: 3 },
  chuspa: { type: "none" }, // 厄災の神(アプ)のward item(passive)
  illa: { type: "repel-spirit" },
  machete: { type: "quiz-save" },
  propina: { type: "gain-cash", amount: 380 },
  chasqui: { type: "extra-turn" },
};
