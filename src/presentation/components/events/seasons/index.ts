import { ComponentType } from "react";
import { Bolivia00 } from "./bolivia-00";
import { Bolivia01 } from "./bolivia-01";
import { Bolivia02 } from "./bolivia-02";
import { Bolivia03 } from "./bolivia-03";
import { Bolivia04 } from "./bolivia-04";
import { Bolivia05 } from "./bolivia-05";
import { Bolivia06 } from "./bolivia-06";
import { Bolivia07 } from "./bolivia-07";
import { Bolivia08 } from "./bolivia-08";
import { Bolivia09 } from "./bolivia-09";
import { Bolivia10 } from "./bolivia-10";
import { Bolivia11 } from "./bolivia-11";
import { India00 } from "./india-00";
import { India01 } from "./india-01";
import { India02 } from "./india-02";
import { India03 } from "./india-03";
import { India04 } from "./india-04";
import { India05 } from "./india-05";
import { India06 } from "./india-06";
import { India07 } from "./india-07";
import { India08 } from "./india-08";
import { India09 } from "./india-09";
import { India10 } from "./india-10";
import { India11 } from "./india-11";
import { Japan00 } from "./japan-00";
import { Japan01 } from "./japan-01";
import { Japan02 } from "./japan-02";
import { Japan03 } from "./japan-03";
import { Japan04 } from "./japan-04";
import { Japan05 } from "./japan-05";
import { Japan06 } from "./japan-06";
import { Japan07 } from "./japan-07";
import { Japan08 } from "./japan-08";
import { Japan09 } from "./japan-09";
import { Japan10 } from "./japan-10";
import { Japan11 } from "./japan-11";

/**
 * 「国-月」→ その月の動く絵。月は0始まりで **0=4月**。
 *
 * 月が替わるたびに季節イベントのモーダルで流す。梅雨なら雨、桜前線なら
 * 花びら、というように、子どもが見ても何の月か分かることを狙っている。
 * 作り方は docs/50-authoring/03-season-animation-guide.md を参照。
 *
 * **足し忘れを防ぐため機械的に整えている。** 登録が無い月は絵なしで
 * これまでどおり文章だけが出る。
 */
export const SEASON_ANIMATIONS: Readonly<Record<string, ComponentType>> = {
  "bolivia-00": Bolivia00,
  "bolivia-01": Bolivia01,
  "bolivia-02": Bolivia02,
  "bolivia-03": Bolivia03,
  "bolivia-04": Bolivia04,
  "bolivia-05": Bolivia05,
  "bolivia-06": Bolivia06,
  "bolivia-07": Bolivia07,
  "bolivia-08": Bolivia08,
  "bolivia-09": Bolivia09,
  "bolivia-10": Bolivia10,
  "bolivia-11": Bolivia11,
  "india-00": India00,
  "india-01": India01,
  "india-02": India02,
  "india-03": India03,
  "india-04": India04,
  "india-05": India05,
  "india-06": India06,
  "india-07": India07,
  "india-08": India08,
  "india-09": India09,
  "india-10": India10,
  "india-11": India11,
  "japan-00": Japan00,
  "japan-01": Japan01,
  "japan-02": Japan02,
  "japan-03": Japan03,
  "japan-04": Japan04,
  "japan-05": Japan05,
  "japan-06": Japan06,
  "japan-07": Japan07,
  "japan-08": Japan08,
  "japan-09": Japan09,
  "japan-10": Japan10,
  "japan-11": Japan11,
};

/** その国のその月の絵。無ければ undefined。 */
export function seasonAnimationFor(countryId: string, monthIndex: number): ComponentType | undefined {
  return SEASON_ANIMATIONS[`${countryId}-${String(monthIndex).padStart(2, "0")}`];
}
