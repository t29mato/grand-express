"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/locale-context";

/**
 * Service Worker の登録と、新しい版が来たときの入れ替え。
 *
 * ## いちばん避けたい事故
 *
 * **黙って古いキャッシュを使い続けること。**
 * Service Worker を入れると、次に開いたときもキャッシュから即座に立ち上がる。
 * 便利な代わりに、新しい版を出しても遊ぶ人には**永遠に届かない**という壊れ方をする。
 * 「直したのに直っていない」と言われても、こちらからは確かめようがない。
 *
 * そこで:
 *
 * 1. Service Worker 側は `install` で `skipWaiting()` を**呼ばない**。
 *    新しい版は「待機」で止まる(遊んでいる最中に中身がすり替わらない)。
 * 2. 待機しているものを見つけたら、この部品が画面に報せを出す。
 * 3. **押されて初めて** `SKIP_WAITING` を送り、入れ替わった合図
 *    (`controllerchange`)で読み込み直す。
 *
 * ## 届くようにするための仕掛け
 *
 * ブラウザが新しい Service Worker を探しに行くのは、既定では
 * 「画面を開いたとき」と「24時間ごと」くらいしかない。**開きっぱなしの
 * タブでは何日でも古いままになる。**そこで、
 *
 * - 1時間ごとに `registration.update()` を呼ぶ
 * - タブに戻ってきたときにも呼ぶ(携帯はこちらのほうが効く)
 *
 * `updateViaCache: "none"` は、`sw.js` 自体がHTTPキャッシュから返らないようにする。
 * GitHub Pages は応答ヘッダをこちらで決められないので、明示しておく。
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const CHECK_INTERVAL_MS = 60 * 60 * 1000;
const VERSION_REPLY_TIMEOUT_MS = 3000;

/**
 * 待機している Service Worker に「あなたは何版か」を訊く。
 *
 * 画面のフッターに出ている版と、報せに出る版を揃えるため。
 * 揃っていないと「更新したのに番号が変わらない」ように見える。
 * 返事が来なければ諦める(番号を出さないだけで、更新自体はできる)。
 */
function askVersion(worker: ServiceWorker): Promise<string | null> {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    const timer = setTimeout(() => resolve(null), VERSION_REPLY_TIMEOUT_MS);
    channel.port1.onmessage = (event) => {
      clearTimeout(timer);
      resolve(typeof event.data === "string" ? event.data : null);
    };
    worker.postMessage({ type: "GET_VERSION" }, [channel.port2]);
  });
}

export function ServiceWorkerUpdate() {
  const { t } = useLocale();
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [newVersion, setNewVersion] = useState("");
  const [applying, setApplying] = useState(false);
  const reloading = useRef(false);

  useEffect(() => {
    // 開発中は入れない。焼いていない `sw.js` を取りに行って404になるだけで、
    // しかも一度入ると手元の変更がキャッシュに隠される。
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    /**
     * **初回の導入と、版の入れ替えを区別する。**
     * どちらも `controllerchange` が飛ぶが、読み込み直すべきなのは後者だけ。
     * 初回(まだ誰も操っていない状態)で読み込み直すと、
     * 初めて開いた人の画面が理由もなく1回瞬く。
     */
    const hadController = Boolean(navigator.serviceWorker.controller);

    const onControllerChange = () => {
      if (!hadController || reloading.current) return;
      reloading.current = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    let registration: ServiceWorkerRegistration | null = null;
    let timer: number | undefined;

    const announce = (worker: ServiceWorker) => {
      setWaiting(worker);
      void askVersion(worker).then((v) => {
        if (v) setNewVersion(v);
      });
    };

    void navigator.serviceWorker
      .register(`${BASE}/sw.js`, { scope: `${BASE}/`, updateViaCache: "none" })
      .then((reg) => {
        registration = reg;
        // 前回開いたときに用意され、押されないまま待っているもの。
        if (reg.waiting && hadController) announce(reg.waiting);

        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            // `controller` があるということは、これは初回ではなく入れ替え。
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              announce(installing);
            }
          });
        });

        timer = window.setInterval(() => {
          void reg.update().catch(() => {});
        }, CHECK_INTERVAL_MS);
      })
      .catch(() => {
        // 入れられない環境(古いブラウザ、プライベート閲覧など)でも遊びは続く。
      });

    const onVisible = () => {
      if (document.visibilityState === "visible") void registration?.update().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisible);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  const apply = useCallback(() => {
    if (!waiting) return;
    setApplying(true);
    waiting.postMessage({ type: "SKIP_WAITING" });
  }, [waiting]);

  if (!waiting) return null;

  // 版は `0.59.0+ab12cd34` の形。人に見せるのは前半だけにして、
  // 中身のハッシュはマウスを乗せたときに読めればよい。
  const [semver] = newVersion.split("+");

  return (
    <div className="sw-update" role="status" aria-live="polite">
      <div className="sw-update-text">
        <strong>{t("updateTitle")}</strong>
        {semver && <span title={newVersion}>{t("updateBody", semver)}</span>}
      </div>
      <button type="button" className="sw-update-action" onClick={apply} disabled={applying}>
        {applying ? t("updateWorking") : t("updateAction")}
      </button>
    </div>
  );
}
