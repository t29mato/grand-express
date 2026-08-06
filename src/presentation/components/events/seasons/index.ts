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
import { France00 } from "./france-00";
import { France01 } from "./france-01";
import { France02 } from "./france-02";
import { France03 } from "./france-03";
import { France04 } from "./france-04";
import { France05 } from "./france-05";
import { France06 } from "./france-06";
import { France07 } from "./france-07";
import { France08 } from "./france-08";
import { France09 } from "./france-09";
import { France10 } from "./france-10";
import { France11 } from "./france-11";
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
import { World00 } from "./world-00";
import { World01 } from "./world-01";
import { World02 } from "./world-02";
import { World03 } from "./world-03";
import { World04 } from "./world-04";
import { World05 } from "./world-05";
import { World06 } from "./world-06";
import { World07 } from "./world-07";
import { World08 } from "./world-08";
import { World09 } from "./world-09";
import { World10 } from "./world-10";
import { World11 } from "./world-11";

/**
 * 「国-月」→ 月替わりに出る絵。月は0始まり(0=4月)で2桁。
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
  "france-00": France00,
  "france-01": France01,
  "france-02": France02,
  "france-03": France03,
  "france-04": France04,
  "france-05": France05,
  "france-06": France06,
  "france-07": France07,
  "france-08": France08,
  "france-09": France09,
  "france-10": France10,
  "france-11": France11,
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
  "world-00": World00,
  "world-01": World01,
  "world-02": World02,
  "world-03": World03,
  "world-04": World04,
  "world-05": World05,
  "world-06": World06,
  "world-07": World07,
  "world-08": World08,
  "world-09": World09,
  "world-10": World10,
  "world-11": World11,
};

/** その国のその月の絵。無ければ undefined。 */
export function seasonAnimationFor(countryId: string, monthIndex: number): ComponentType | undefined {
  return SEASON_ANIMATIONS[`${countryId}-${String(monthIndex).padStart(2, "0")}`];
}
