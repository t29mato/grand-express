"use client";

import { useGameStore } from "../state/game-store";
import { LocaleProvider } from "../i18n/locale-context";
import { SetupScreen } from "./setup/setup-screen";
import { GameScreen } from "./game-screen";

function GameAppInner() {
  const session = useGameStore((s) => s.session);
  return session ? <GameScreen /> : <SetupScreen />;
}

export function GameApp() {
  return (
    <LocaleProvider>
      <GameAppInner />
    </LocaleProvider>
  );
}
