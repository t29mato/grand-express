/**
 * 新しい版が来たときに出す文言。
 *
 * `src/i18n/messages/*.json` は抽出の生成物なので、legacy に無いものは
 * ここに置いて `messages.ts` で重ねる(`feedback-messages.ts` と同じ作法)。
 *
 * **「更新しました」ではなく「更新します」と書く。**押すと読み込み直しが走るので、
 * 何が起きるかを押す前に伝える。遊んでいる旅は手番ごとに保存されているので、
 * そこも一言添える(黙って読み込み直すと、消えたと思われる)。
 */
export const UPDATE_MESSAGES = {
  en: {
    updateTitle: "A new version is available",
    updateBody: "Update to v{0}. Your game is saved.",
    updateAction: "Update",
    updateWorking: "Updating…",
  },
  es: {
    updateTitle: "Hay una versión nueva",
    updateBody: "Actualizar a la v{0}. Tu partida está guardada.",
    updateAction: "Actualizar",
    updateWorking: "Actualizando…",
  },
  fr: {
    updateTitle: "Une nouvelle version est disponible",
    updateBody: "Passer à la v{0}. Votre partie est sauvegardée.",
    updateAction: "Mettre à jour",
    updateWorking: "Mise à jour…",
  },
  ja: {
    updateTitle: "新しいバージョンがあります",
    updateBody: "v{0} に更新します。遊んでいる旅は保存済みです。",
    updateAction: "更新",
    updateWorking: "更新しています…",
  },
} as const;
