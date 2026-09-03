"use client";

import { CityId } from "../../../domain/shared-kernel/ids";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { CityArt } from "../city/city-art";
import { Modal } from "./modal";

/**
 * 町の物件をすべてそろえた(独占)ときの知らせ。**誰の手番でも出す。**
 *
 * その町の収入が2倍になる(`property-income-service.ts` の `totalIncome`)ので、
 * 盤面の力関係がここで変わる。それまでは旅人一覧の `👑` の数が1つ増えるだけで、
 * 誰も気づかないまま試合が決まっていた。
 */
export function MonopolyModal({
  context,
  playerName,
  cityId,
  onClose,
}: {
  context: GameEngineContext;
  playerName: string;
  cityId: CityId;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();
  const city = context.getCity(cityId);

  return (
    <Modal testId="monopoly-modal">
      <div className="eyebrow">👑</div>
      <h3>{t("monopolyTitle")}</h3>
      <CityArt context={context} cityId={cityId} />
      <p>{renderRichText(t("monopolyBody", playerName, tx(city.name)))}</p>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
