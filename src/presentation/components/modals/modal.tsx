"use client";

import { ReactNode } from "react";

export function Modal({ children, testId }: { children: ReactNode; testId?: string }) {
  return (
    <div className="overlay show">
      {/* testId はE2Eからモーダルの種類を確実に見分けるためのもの
          (文言での判別は曖昧一致で取り違えるため)。 */}
      <div className="modal-box" data-testid={testId}>
        {children}
      </div>
    </div>
  );
}
