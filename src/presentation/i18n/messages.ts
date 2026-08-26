import en from "../../i18n/messages/en.json";
import es from "../../i18n/messages/es.json";
import fr from "../../i18n/messages/fr.json";
import ja from "../../i18n/messages/ja.json";
import { Locale } from "../../domain/shared-kernel/localized-text";
import { SETUP_MESSAGES } from "./setup-messages";
import { FEEDBACK_MESSAGES } from "./feedback-messages";
import { GAME_LOG_MESSAGES } from "./game-log-messages";
import { HUD_MESSAGES } from "./hud-messages";
import { SOUND_MESSAGES } from "./sound-messages";
import { ITEM_MESSAGES } from "./item-messages";
import { LEGEND_MESSAGES } from "./legend-messages";
import { BOARD_MESSAGES } from "./board-messages";
import { EVENT_MESSAGES } from "./event-messages";
import { TRAVEL_LOG_MESSAGES } from "./travel-log-messages";
import { CITY_MESSAGES } from "./city-messages";
import { SAVED_GAME_MESSAGES } from "./saved-game-messages";
import { UPDATE_MESSAGES } from "./update-messages";

export type UiMessages = typeof en;

/**
 * `src/i18n/messages/*.json` は抽出の生成物なので、legacy に無いUI文言は
 * `setup-messages.ts` 側に置いてここで重ねる(生成物を直接書き換えない)。
 */
export const MESSAGES_BY_LOCALE: Record<Locale, UiMessages> = {
  en: {
    ...en,
    ...SETUP_MESSAGES.en,
    ...FEEDBACK_MESSAGES.en,
    ...GAME_LOG_MESSAGES.en,
    ...SOUND_MESSAGES.en,
    ...HUD_MESSAGES.en,
    ...ITEM_MESSAGES.en,
    ...LEGEND_MESSAGES.en,
    ...BOARD_MESSAGES.en,
    ...EVENT_MESSAGES.en,
    ...TRAVEL_LOG_MESSAGES.en,
    ...CITY_MESSAGES.en,
    ...SAVED_GAME_MESSAGES.en,
    ...UPDATE_MESSAGES.en,
  },
  es: {
    ...es,
    ...SETUP_MESSAGES.es,
    ...FEEDBACK_MESSAGES.es,
    ...GAME_LOG_MESSAGES.es,
    ...SOUND_MESSAGES.es,
    ...HUD_MESSAGES.es,
    ...ITEM_MESSAGES.es,
    ...LEGEND_MESSAGES.es,
    ...BOARD_MESSAGES.es,
    ...EVENT_MESSAGES.es,
    ...TRAVEL_LOG_MESSAGES.es,
    ...CITY_MESSAGES.es,
    ...SAVED_GAME_MESSAGES.es,
    ...UPDATE_MESSAGES.es,
  },
  fr: {
    ...fr,
    ...SETUP_MESSAGES.fr,
    ...FEEDBACK_MESSAGES.fr,
    ...GAME_LOG_MESSAGES.fr,
    ...SOUND_MESSAGES.fr,
    ...HUD_MESSAGES.fr,
    ...ITEM_MESSAGES.fr,
    ...LEGEND_MESSAGES.fr,
    ...BOARD_MESSAGES.fr,
    ...EVENT_MESSAGES.fr,
    ...TRAVEL_LOG_MESSAGES.fr,
    ...CITY_MESSAGES.fr,
    ...SAVED_GAME_MESSAGES.fr,
    ...UPDATE_MESSAGES.fr,
  },
  ja: {
    ...(ja as UiMessages),
    ...SETUP_MESSAGES.ja,
    ...FEEDBACK_MESSAGES.ja,
    ...GAME_LOG_MESSAGES.ja,
    ...SOUND_MESSAGES.ja,
    ...HUD_MESSAGES.ja,
    ...ITEM_MESSAGES.ja,
    ...LEGEND_MESSAGES.ja,
    ...BOARD_MESSAGES.ja,
    ...EVENT_MESSAGES.ja,
    ...TRAVEL_LOG_MESSAGES.ja,
    ...CITY_MESSAGES.ja,
    ...SAVED_GAME_MESSAGES.ja,
    ...UPDATE_MESSAGES.ja,
  },
};

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "es", "fr", "ja"];

/**
 * `{0}`, `{1}` ... 形式のプレースホルダーを埋め込む(現行コードの `T()`/`T2()` を踏襲)。
 * next-intlのICU構文ではなく、legacyから抽出した位置引数プレースホルダーを
 * そのまま使う実用的な選択(ADR-0006の実装上の簡略化)。
 */
export function formatMessage(template: string, ...args: (string | number)[]): string {
  let result = template;
  args.forEach((value, index) => {
    result = result.split(`{${index}}`).join(String(value));
  });
  return result;
}
