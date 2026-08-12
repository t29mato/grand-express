"use client";

import { useEffect, useMemo, useState } from "react";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { CpuLevel } from "../../../domain/cpu/cpu-level";
import { DEFAULT_KNOWLEDGE_LEVEL, KNOWLEDGE_LEVELS, KnowledgeLevel } from "../../../domain/quiz/knowledge-level";
import { PlayerSetup } from "../../../application/use-cases/start-game/start-game.use-case";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { ALL_REGIONS, SCALE_LABEL, boardScale, groupCountries } from "./country-groups";
import { WorldPicker } from "./world-picker";
import { loadPlayerSetup, savePlayerSetup } from "../../../infrastructure/persistence/local-storage-player-setup";
import { useGameStore } from "../../state/game-store";
import { useLocale } from "../../i18n/locale-context";
import { useTitleMusic } from "../../hooks/use-title-music";
import { LocaleSwitch } from "../hud/locale-switch";
import { MusicToggle } from "../hud/music-toggle";
import { SavedGameCard } from "./saved-game-card";
import { SetupHeroTrain } from "./setup-hero-train";

const MONTH_OPTIONS = [12, 24, 36];

/** 常に見せておく枠の数。4人目は「足す」を押したときだけ現れる。 */
const ALWAYS_VISIBLE_SLOTS = 3;

interface SlotConfig {
  /**
   * 入力された名前。`null` は「まだ触っていない」= 既定名を使う、の意味。
   * 既定名を文字列で持ってしまうと、言語を切り替えたときに
   * 「自分で付けた名前」と見分けが付かず、上書きするか英語のまま残すかの
   * どちらかしか選べなくなる。持たないことで、既定のときだけ言語に追随する。
   */
  name: string | null;
  mode: "human" | "cpu" | "off";
  /** 対象国への知識レベル(人間のみ)。CPUには意味が無いので、CPUの枠では出さない。 */
  knowledgeLevel: KnowledgeLevel;
  /**
   * このCPUの強さ。**枠ごとに持つ。**
   * 以前はゲーム全体で1つだったので、手加減する相手と本気の相手を混ぜられなかった。
   */
  cpuLevel: CpuLevel;
}

const KNOWLEDGE_LABEL: Record<KnowledgeLevel, string> = {
  newcomer: "knowledgeNewcomer",
  familiar: "knowledgeFamiliar",
  local: "knowledgeLocal",
};

export function SetupScreen() {
  const { t, tx } = useLocale();
  const startNewGame = useGameStore((s) => s.startNewGame);
  const loadSavedGame = useGameStore((s) => s.loadSavedGame);
  const savedGame = useGameStore((s) => s.savedGame);
  const refreshSavedGame = useGameStore((s) => s.refreshSavedGame);
  const discardSavedGame = useGameStore((s) => s.discardSavedGame);

  // 旅立つ前のテーマ曲。最初に何か触られてから鳴り始める(自動再生ポリシー)。
  useTitleMusic();

  // localStorage はサーバー描画時に読めないため、マウント後に読み直す
  // (初期描画から差が出るとハイドレーションがずれるため)。
  useEffect(() => {
    refreshSavedGame();
  }, [refreshSavedGame]);

  const [country, setCountry] = useState<CountryId>(CountryId("bolivia"));
  const chosenCountry = COUNTRY_INDEX.find((entry) => entry.id === country);
  /**
   * 見せている地域。**既定は「ぜんぶ」。**最初から絞ってしまうと、
   * どんな盤面があるのか分からないまま選ぶことになる。
   */
  const [region, setRegion] = useState<string>(ALL_REGIONS.key);
  /**
   * 絞り込みの帯に出す地域。**「地球をまわる」は外す。**
   * 世界一周は地図の1点で指せないので、地図の下に専用のボタンを置いている。
   * 帯にも同じ名前を並べると、同じ名前のボタンが2つになって何が違うのか分からない。
   */
  const groupsWithBoards = useMemo(
    () => groupCountries(COUNTRY_INDEX).map(({ group }) => group).filter((group) => group.key !== "world"),
    [],
  );
  const shownCountries = useMemo(() => {
    const grouped = groupCountries(COUNTRY_INDEX);
    // 「ぜんぶ」でも並び順は束の順。登録順のままだと、盤面が増えるたびに
    // いつもの場所からいつものものが消える。
    return grouped
      .filter(({ group }) => region === ALL_REGIONS.key || group.key === region)
      .flatMap(({ entries }) => entries);
  }, [region]);
  const [months, setMonths] = useState(12);
  /**
   * ゲーム全体のCPUの強さ。**画面からは選べない**(強さはCPUごとに選ぶ)。
   * `startGame` は、CPUごとの指定が無いときの既定としてこれを使う
   * (古いセーブとの互換。`start-game.use-case.ts` 参照)。
   */
  const cpuLevel: CpuLevel = "normal";
  const [starting, setStarting] = useState(false);
  const [slots, setSlots] = useState<SlotConfig[]>([
    { name: null, mode: "human", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL, cpuLevel: "normal" },
    { name: null, mode: "cpu", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL, cpuLevel: "normal" },
    { name: null, mode: "cpu", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL, cpuLevel: "normal" },
    { name: null, mode: "off", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL, cpuLevel: "normal" },
  ]);

  /**
   * 前の旅の顔ぶれを引き継ぐ。同じ人たちで続けて遊ぶのに、
   * 毎回名前を入れ直させていた。
   *
   * **マウント後に読む。** `useState` の初期値にすると、サーバー描画では
   * localStorage が読めないので初期描画と食い違う(ハイドレーションがずれる)。
   * `refreshSavedGame` と同じ扱い。
   *
   * 覚えているのは**名前と、その枠を誰が使うか**だけ。知識レベルは国ごとの話で、
   * 国は毎回選び直すので持ち越さない(`local-storage-player-setup.ts` 参照)。
   */
  useEffect(() => {
    const remembered = loadPlayerSetup();
    if (!remembered) return;
    // マウント後にしか localStorage を読めないので、ここでの setState は避けられない
    // (描画中に読むと、サーバー描画の結果と食い違ってハイドレーションがずれる)。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlots((prev) =>
      prev.map((slot, i) => {
        const saved = remembered[i];
        if (!saved) return slot;
        return { ...slot, name: saved.name, mode: saved.mode };
      }),
    );
  }, []);

  /** 1人目は「あなた」、2人目以降は「CPU 1」「CPU 2」…。表示中の言語で返す。 */
  const defaultSlotName = (index: number) =>
    index === 0 ? t("defaultPlayerName") : t("defaultCpuName", index);

  /** 名前欄に出す文字。自分で付けた名前があればそれ、無ければ既定名。 */
  const slotName = (slot: SlotConfig, index: number) => slot.name ?? defaultSlotName(index);

  const updateSlot = (index: number, patch: Partial<SlotConfig>) => {
    setSlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, ...patch } : slot)));
  };

  // 空の4枠目をいつも出しておくと「設定画面」に見えるので、
  // 使うと決めたときだけ現れるようにする。
  const extraSlotShown = slots[ALWAYS_VISIBLE_SLOTS].mode !== "off";
  const visibleSlots = extraSlotShown ? slots.length : ALWAYS_VISIBLE_SLOTS;

  const handleStart = () => {
    const players: PlayerSetup[] = slots
      .map((slot, i) => ({ slot, i }))
      .filter(({ slot }) => slot.mode !== "off")
      .map(({ slot, i }) => ({
        // 名前欄を空にしたまま始めたときも、英語の "Player" ではなく既定名に戻す。
        name: slot.name?.trim() || defaultSlotName(i),
        isCpu: slot.mode === "cpu",
        knowledgeLevel: slot.knowledgeLevel,
        cpuLevel: slot.cpuLevel,
      }));
    if (players.length < 2 || starting) return;
    // 次に「新しい旅」を始めるとき、同じ顔ぶれをそのまま出せるように覚えておく。
    // 既定名のままの枠は `null` で覚える(言語に追随させ続けるため)。
    savePlayerSetup(slots.map((slot) => ({ name: slot.name, mode: slot.mode })));
    setStarting(true);
    void startNewGame({ countryId: country, players, maxMonths: months, cpuLevel }).finally(() => setStarting(false));
  };

  return (
    <div className="setup-screen">
      <div className="setup-shell">
        {/* 動きのある見出し。絵は飾りなので aria からは隠し、文字は暗幕の上に置く。 */}
        <div className="setup-hero">
          <SetupHeroTrain />
          <div className="setup-hero-body">
            <div className="setup-hero-top">
              <span className="setup-mark">WORLD EXPRESS</span>
              <div className="setup-hero-controls">
                <LocaleSwitch />
                <MusicToggle />
              </div>
            </div>
            <h1 className="setup-title">{t("setupTitle")}</h1>
            <p className="tagline">{t("tagline")}</p>
          </div>
        </div>

        {savedGame && (
          <SavedGameCard saved={savedGame} onResume={loadSavedGame} onDiscard={discardSavedGame} />
        )}

        <div className="card">
          <fieldset className="setup-group">
            <legend className="eyebrow">{t("chooseCountry")}</legend>
            {/* **世界地図から選ぶ。**盤面が19枚になり、名前の一覧だけでは
                「どこの話なのか」が分からなくなった。地理を扱う遊びなので、
                地図の上で選べるほうが筋が通っている。

                帯で地域を絞ると印が減り、**そのときだけ印に名前が出る。**
                18個に名前を付けると字だらけで地図が見えなくなる(撮って確かめた)。 */}
            <div className="region-tabs">
              {[ALL_REGIONS, ...groupsWithBoards].map((group) => (
                <button
                  key={group.key}
                  type="button"
                  aria-pressed={region === group.key}
                  className={`region-tab${region === group.key ? " on" : ""}`}
                  onClick={() => setRegion(group.key)}
                >
                  {tx(group.label)}
                </button>
              ))}
            </div>
            <WorldPicker
              boards={shownCountries}
              allBoards={COUNTRY_INDEX}
              selected={country}
              onSelect={(id) => setCountry(CountryId(id))}
            />
            {/* **狭い画面では地図を使わない。**390pxの幅だと地図は324×106pxにしかならず、
                印の間隔が7pxになって指では押し分けられない(実測)。札の一覧に切り替える。
                どちらを見せるかはCSSの担当(`.world-picker` と `.country-grid`)。 */}
            <div className="country-grid">
              {shownCountries.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`ccard${country === entry.id ? " on" : ""}`}
                  aria-pressed={country === entry.id}
                  onClick={() => setCountry(CountryId(entry.id))}
                >
                  <span className="country-thumb-wrap">
                    <svg
                      className="country-thumb"
                      viewBox={entry.thumbViewBox}
                      role="presentation"
                      preserveAspectRatio="xMidYMid meet"
                      dangerouslySetInnerHTML={{ __html: entry.thumbSvg }}
                    />
                    <span className={`scale-tag ${boardScale(entry.id)}`}>
                      {tx(SCALE_LABEL[boardScale(entry.id)])}
                    </span>
                  </span>
                  <span className="nm">{tx(entry.name)}</span>
                </button>
              ))}
            </div>
            {chosenCountry && (
              <p className="country-chosen">
                <span className="nm">{tx(chosenCountry.name)}</span>
                <span className="sub">{tx(chosenCountry.blurb)}</span>
              </p>
            )}
          </fieldset>

          <div className="setup-cols">
            <fieldset className="setup-group">
              <legend className="eyebrow">{t("whoPlays")}</legend>
              <p className="setup-hint">{t("setupSub")}</p>

              {slots.slice(0, visibleSlots).map((slot, i) => (
                <div className="slot" key={i}>
                  <input
                    value={slotName(slot, i)}
                    maxLength={16}
                    aria-label={t("travellerSlot", i + 1)}
                    onChange={(e) => updateSlot(i, { name: e.target.value })}
                  />
                  <div className="seg">
                    {(["human", "cpu", "off"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        className={slot.mode === mode ? "on" : ""}
                        disabled={i < 2 && mode === "off"}
                        onClick={() => updateSlot(i, { mode })}
                      >
                        {mode === "human" ? t("human") : mode === "cpu" ? "CPU" : t("off")}
                      </button>
                    ))}
                  </div>
                  {/* 知識レベルは人間プレイヤーのみ。CPUは強さ設定が同じ役割を果たす。
                      行が横に長くなるため、レベルのセグメントは次の行へ折り返す。 */}
                  {/* CPUの枠には強さを出す。**CPUごとに変えられる。**
                      以前はゲーム全体で1つだったので、手加減する相手と
                      本気の相手を混ぜられなかった。 */}
                  {slot.mode === "cpu" && (
                    <div className="slot-knowledge">
                      <span className="knowledge-label">{t("cpuLevel")}</span>
                      <div className="seg">
                        {(["gentle", "normal", "merciless"] as const).map((lv) => (
                          <button
                            key={lv}
                            type="button"
                            className={slot.cpuLevel === lv ? "on" : ""}
                            onClick={() => updateSlot(i, { cpuLevel: lv })}
                          >
                            {lv === "gentle" ? t("lvEasy") : lv === "normal" ? t("lvNormal") : t("lvOni")}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {slot.mode === "human" && (
                    <div className="slot-knowledge">
                      <span className="knowledge-label">{t("knowledgeLevel")}</span>
                      <div className="seg">
                        {KNOWLEDGE_LEVELS.map((level) => (
                          <button
                            key={level}
                            type="button"
                            className={slot.knowledgeLevel === level ? "on" : ""}
                            onClick={() => updateSlot(i, { knowledgeLevel: level })}
                          >
                            {t(KNOWLEDGE_LABEL[level])}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {!extraSlotShown && (
                <button
                  type="button"
                  className="add-slot"
                  onClick={() => updateSlot(ALWAYS_VISIBLE_SLOTS, { mode: "cpu" })}
                >
                  + {t("addTraveller")}
                </button>
              )}
            </fieldset>

            <fieldset className="setup-group">
              <legend className="eyebrow">{t("rulesGroup")}</legend>

              <div className="rule-row">
                <span className="rule-label">{t("length")}</span>
                <div className="seg">
                  {MONTH_OPTIONS.map((m) => (
                    <button key={m} type="button" className={months === m ? "on" : ""} onClick={() => setMonths(m)}>
                      {t(`y${m / 12}`)}
                    </button>
                  ))}
                </div>
              </div>

            </fieldset>
          </div>

          <div className="btnrow">
            <button className="btn btn-start" onClick={handleStart} disabled={starting}>
              {starting ? t("thinking") : t("start")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
