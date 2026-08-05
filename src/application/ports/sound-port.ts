/**
 * 効果音・BGMのポート。現行コードの `Snd` エンジンに相当。
 * メソッド名・発火タイミングは legacy の呼び出し箇所(`Snd.xxx()`)にそのまま対応させている。
 */
export interface SoundPort {
  /** 通過中の地方に応じてBGMを切り替える(次の小節の頭で滑らかに切り替わる)。 */
  setRegion(regionId: string): void;
  /** サイコロを振っている間の連続音。 */
  playRattle(): void;
  /** サイコロが弾んだ瞬間の音。 */
  playThud(): void;
  /** 駒が1マス進むごとの足音。 */
  playStep(): void;
  /** 汎用的な獲得音(ダイス確定・青マス・売却など)。 */
  playCoin(): void;
  /** 損失・不正解・赤マスの音。 */
  playWrong(): void;
  /** クイズ正解の音。 */
  playRight(): void;
  /** 購入・増資・屋台での買い物の音。 */
  playBuy(): void;
  /** ルーレット(青・赤マス)のスピン中のティック音。 */
  playTick(): void;
  /** 季節の変わり目・カードマスでの入手音。 */
  playChime(): void;
  /** 独占達成・目的地到着のファンファーレ。 */
  playFanfare(): void;
  /** 厄災の神の発動音。 */
  playDoom(isKing: boolean): void;
  /** ゲーム終了時の勝利音。 */
  playWin(): void;
  setMuted(muted: boolean): void;
}
