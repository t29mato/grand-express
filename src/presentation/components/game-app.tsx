"use client";

import { useGameStore } from "../state/game-store";
import { SetupScreen } from "./setup/setup-screen";
import { GameScreen } from "./game-screen";

/** 言語の状態は `AppShell`(レイアウト)側で持つ。 */
export function GameApp() {
  const session = useGameStore((s) => s.session);
  return session ? <GameScreen /> : <SetupScreen />;
}
