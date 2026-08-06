"use client";

import { ReactNode } from "react";
import { LocaleSwitch } from "../hud/locale-switch";

/**
 * モーダルの枠。
 *
 * 言語切替を**モーダルの中にも**置いている。オーバーレイが画面全体を覆うため、
 * モーダルが開いているあいだヘッダーの切替は押せない。出来事の説明やクイズを
 * 読んでいる最中に「自分の言語で読み直したい」ことがある(日本語を学んでいる人が
 * 母語で確認する、など)ので、その場で切り替えられる必要がある。
 */
export function Modal({ children, testId }: { children: ReactNode; testId?: string }) {
  return (
    <div className="overlay show">
      {/* testId はE2Eからモーダルの種類を確実に見分けるためのもの
          (文言での判別は曖昧一致で取り違えるため)。 */}
      <div className="modal-box" data-testid={testId}>
        <div className="modal-lang">
          <LocaleSwitch />
        </div>
        {children}
      </div>
    </div>
  );
}
