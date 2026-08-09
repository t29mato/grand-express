"use client";

import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";

/**
 * 「出目を自分で選べる」アイテムを使ったときに出す、1〜6を選ぶ画面。
 *
 * このアイテム(時刻表・タクシー・周遊券・急行券・時計)は、**選ぶ画面が
 * 無いままだった。**使うと持ち物から消えて、ログに1行残るだけで何も起きない
 * ——「壊れている」と報告されたのはこれ。
 *
 * 閉じる手段は置かない。選ばずに閉じられると、アイテムを失ったうえに
 * 手番も進まない行き止まりになる。
 */
export function ExactDiceModal({ onChoose }: { onChoose: (value: number) => void }) {
  const { t } = useLocale();
  return (
    <Modal testId="exact-dice-modal">
      <div className="eyebrow">🎲 {t("exactDiceTitle")}</div>
      <p style={{ color: "var(--salt-dim)", marginTop: 8 }}>{t("exactDiceHint")}</p>
      {/*
       * 狭い幅では折り返す。**素直に並べると 5+1 になって、「6」だけが
       * 下に1つ取り残される**(375pxで確認)。数を選ばせる場面なので、
       * 均等に割れて見えるほうがよい。`auto-fit` にすると、
       * 広い幅では6つ横一列、狭い幅では3+3 に落ち着く。
       */}
      <div
        className="btnrow"
        style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))", gap: 8 }}
      >
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <button key={value} className="btn opt" data-value={value} onClick={() => onChoose(value)}>
            {value}
          </button>
        ))}
      </div>
    </Modal>
  );
}
