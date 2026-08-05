"use client";

import { useState } from "react";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { CpuLevel } from "../../../domain/cpu/cpu-level";
import { DEFAULT_KNOWLEDGE_LEVEL, KNOWLEDGE_LEVELS, KnowledgeLevel } from "../../../domain/quiz/knowledge-level";
import { PlayerSetup } from "../../../application/use-cases/start-game/start-game.use-case";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { useGameStore } from "../../state/game-store";
import { useLocale } from "../../i18n/locale-context";
import { LocaleSwitch } from "../hud/locale-switch";

const MONTH_OPTIONS = [12, 24, 36];

interface SlotConfig {
  name: string;
  mode: "human" | "cpu" | "off";
  /** 対象国への知識レベル(人間のみ)。CPUは cpuLevel が同じ役割を果たすため不要。 */
  knowledgeLevel: KnowledgeLevel;
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
  const hasSavedGame = useGameStore((s) => s.hasSavedGame);

  const [country, setCountry] = useState<CountryId>(CountryId("bolivia"));
  const [months, setMonths] = useState(12);
  const [cpuLevel, setCpuLevel] = useState<CpuLevel>("normal");
  const [starting, setStarting] = useState(false);
  const [slots, setSlots] = useState<SlotConfig[]>([
    { name: "You", mode: "human", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL },
    { name: "CPU 1", mode: "cpu", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL },
    { name: "CPU 2", mode: "cpu", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL },
    { name: "CPU 3", mode: "off", knowledgeLevel: DEFAULT_KNOWLEDGE_LEVEL },
  ]);

  const handleStart = () => {
    const players: PlayerSetup[] = slots
      .filter((s) => s.mode !== "off")
      .map((s) => ({
        name: s.name || "Player",
        isCpu: s.mode === "cpu",
        knowledgeLevel: s.knowledgeLevel,
      }));
    if (players.length < 2 || starting) return;
    setStarting(true);
    void startNewGame({ countryId: country, players, maxMonths: months, cpuLevel }).finally(() => setStarting(false));
  };

  return (
    <div className="setup-screen">
      <div className="card">
        <LocaleSwitch />
        <h1 style={{ marginTop: 12 }}>{t("setupTitle")}</h1>
        <p className="tagline">{t("tagline")}</p>

        {hasSavedGame && (
          <div className="btnrow" style={{ margin: "14px 0" }}>
            <button className="btn" style={{ width: "100%" }} onClick={loadSavedGame}>
              {t("resume")}
            </button>
          </div>
        )}

        <div className="eyebrow">{t("chooseCountry")}</div>
        <div className="countries">
          {COUNTRY_INDEX.map((entry) => (
            <button
              key={entry.id}
              className={`ccard${country === entry.id ? " on" : ""}`}
              onClick={() => setCountry(CountryId(entry.id))}
            >
              <svg
                className="country-thumb"
                viewBox={entry.thumbViewBox}
                role="presentation"
                dangerouslySetInnerHTML={{ __html: entry.thumbSvg }}
              />
              <div className="cap">
                <div className="nm">{tx(entry.name)}</div>
                <div className="sub">{tx(entry.blurb)}</div>
              </div>
            </button>
          ))}
        </div>

        <p className="sub">{t("setupSub")}</p>

        {slots.map((slot, i) => (
          <div className="slot" key={i}>
            <input
              value={slot.name}
              maxLength={16}
              aria-label={`Player ${i + 1} name`}
              onChange={(e) => {
                const next = [...slots];
                next[i] = { ...next[i], name: e.target.value };
                setSlots(next);
              }}
            />
            <div className="seg">
              {(["human", "cpu", "off"] as const).map((mode) => (
                <button
                  key={mode}
                  className={slot.mode === mode ? "on" : ""}
                  disabled={i < 2 && mode === "off"}
                  onClick={() => {
                    const next = [...slots];
                    next[i] = { ...next[i], mode };
                    setSlots(next);
                  }}
                >
                  {mode === "human" ? t("human") : mode === "cpu" ? "CPU" : t("off")}
                </button>
              ))}
            </div>
            {/* 知識レベルは人間プレイヤーのみ。CPUは強さ設定が同じ役割を果たす。
                行が横に長くなるため、レベルのセグメントは次の行へ折り返す。 */}
            {slot.mode === "human" && (
              <div className="slot-knowledge">
                <span className="knowledge-label">{t("knowledgeLevel")}</span>
                <div className="seg">
                  {KNOWLEDGE_LEVELS.map((level) => (
                    <button
                      key={level}
                      className={slot.knowledgeLevel === level ? "on" : ""}
                      onClick={() => {
                        const next = [...slots];
                        next[i] = { ...next[i], knowledgeLevel: level };
                        setSlots(next);
                      }}
                    >
                      {t(KNOWLEDGE_LABEL[level])}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="slot">
          <span style={{ fontWeight: 800, flex: 1 }}>{t("length")}</span>
          <div className="seg">
            {MONTH_OPTIONS.map((m) => (
              <button key={m} className={months === m ? "on" : ""} onClick={() => setMonths(m)}>
                {t(`y${m / 12}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="slot">
          <span style={{ fontWeight: 800, flex: 1 }}>{t("cpuLevel")}</span>
          <div className="seg">
            {(["gentle", "normal", "merciless"] as const).map((lv) => (
              <button key={lv} className={cpuLevel === lv ? "on" : ""} onClick={() => setCpuLevel(lv)}>
                {lv === "gentle" ? t("lvEasy") : lv === "normal" ? t("lvNormal") : t("lvOni")}
              </button>
            ))}
          </div>
        </div>

        <div className="btnrow">
          <button className="btn" style={{ width: "100%" }} onClick={handleStart} disabled={starting}>
            {starting ? t("thinking") : t("start")}
          </button>
        </div>
      </div>
    </div>
  );
}
