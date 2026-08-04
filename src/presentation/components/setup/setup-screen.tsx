"use client";

import { useState } from "react";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { Locale } from "../../../domain/shared-kernel/localized-text";
import { CpuLevel } from "../../../domain/cpu/cpu-level";
import { PlayerSetup } from "../../../application/use-cases/start-game/start-game.use-case";
import { contentRepository, useGameStore } from "../../state/game-store";
import { useLocale } from "../../i18n/locale-context";
import { SUPPORTED_LOCALES } from "../../i18n/messages";

const COUNTRY_IDS = ["bolivia", "japan"] as const;
const MONTH_OPTIONS = [12, 24, 36];

interface SlotConfig {
  name: string;
  mode: "human" | "cpu" | "off";
}

export function SetupScreen() {
  const { t, tx, locale, setLocale } = useLocale();
  const startNewGame = useGameStore((s) => s.startNewGame);
  const loadSavedGame = useGameStore((s) => s.loadSavedGame);
  const hasSavedGame = useGameStore((s) => s.hasSavedGame);

  const [country, setCountry] = useState<CountryId>(CountryId("bolivia"));
  const [months, setMonths] = useState(12);
  const [cpuLevel, setCpuLevel] = useState<CpuLevel>("normal");
  const [slots, setSlots] = useState<SlotConfig[]>([
    { name: "You", mode: "human" },
    { name: "CPU 1", mode: "cpu" },
    { name: "CPU 2", mode: "cpu" },
    { name: "CPU 3", mode: "off" },
  ]);

  const handleStart = () => {
    const players: PlayerSetup[] = slots
      .filter((s) => s.mode !== "off")
      .map((s) => ({ name: s.name || "Player", isCpu: s.mode === "cpu" }));
    if (players.length < 2) return;
    startNewGame({ countryId: country, players, maxMonths: months, cpuLevel });
  };

  return (
    <div className="setup-screen">
      <div className="card">
        <div className="langseg">
          {SUPPORTED_LOCALES.map((l) => (
            <button key={l} className={l === locale ? "on" : ""} onClick={() => setLocale(l as Locale)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
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
          {COUNTRY_IDS.map((id) => {
            const pack = contentRepository.load(CountryId(id));
            return (
              <button key={id} className={`ccard${country === id ? " on" : ""}`} onClick={() => setCountry(CountryId(id))}>
                <div className="cap">
                  <div className="nm">{tx(pack.name)}</div>
                  <div className="sub">{tx(pack.blurb)}</div>
                </div>
              </button>
            );
          })}
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
          </div>
        ))}

        <div className="slot">
          <span style={{ fontWeight: 800, flex: 1 }}>{t("length")}</span>
          <div className="seg">
            {MONTH_OPTIONS.map((m) => (
              <button key={m} className={months === m ? "on" : ""} onClick={() => setMonths(m)}>
                {m / 12} {m === 12 ? t("y1") : `${m / 12}y`}
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
          <button className="btn" style={{ width: "100%" }} onClick={handleStart}>
            {t("start")}
          </button>
        </div>
      </div>
    </div>
  );
}
