"use client";

import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";

/** セーブ完了を知らせるモーダル。 */
export function SavedModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  return (
    <Modal>
      <div className="eyebrow">💾 {t("save")}</div>
      <h3>{t("saved")}</h3>
      <p style={{ color: "var(--salt-dim)", marginTop: 8 }}>{t("saveDone")}</p>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
