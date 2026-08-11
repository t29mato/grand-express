import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { TrainToken } from "./train-token";

/**
 * 駒に乗るもの(運ばれているアイテム・憑いている厄災の神)の描き方。
 *
 * 2026-08-11、神が盤面に**一切出ていなかった**ので追加した。
 * 出す場所は撮って決めている(`docs` ではなく実物を見た):
 * 後ろ(左)に置くと、同じマスに並んだ**左隣の駒の車体にかかって**、
 * どちらに憑いているのか分からない絵になった。真上なら隣と重ならない。
 */
function renderToken(props: Partial<Parameters<typeof TrainToken>[0]> = {}) {
  const { container } = render(
    <svg>
      <TrainToken x={0} y={0} color="#e0457b" isActive={false} {...props} />
    </svg>,
  );
  return container;
}

describe("TrainToken", () => {
  it("日付変更線をまたいだときは、滑らせずに飛ばす", () => {
    // 太平洋は盤面の左右に分かれているので、渡る1歩で座標が3300ほど動く。
    // そのまま滑らせると**駒がアフリカの上を横切って盤面を走り抜ける。**
    const { container, rerender } = render(
      <svg>
        <TrainToken x={3400} y={860} color="#e0457b" isActive={false} stepMs={300} />
      </svg>,
    );
    const token = container.querySelector(".token") as SVGGElement;
    expect(token.style.transition).toBe("transform 300ms linear");

    rerender(
      <svg>
        <TrainToken x={240} y={857} color="#e0457b" isActive={false} stepMs={300} />
      </svg>,
    );
    expect(token.style.transition).toBe("none");
  });

  it("ふつうの1歩は滑らせる", () => {
    const { container, rerender } = render(
      <svg>
        <TrainToken x={1000} y={500} color="#e0457b" isActive={false} stepMs={300} />
      </svg>,
    );
    const token = container.querySelector(".token") as SVGGElement;
    rerender(
      <svg>
        {/* いちばん広い盤面(seg=150)の1歩でも、飛ぶ扱いの距離には届かない */}
        <TrainToken x={1150} y={500} color="#e0457b" isActive={false} stepMs={300} />
      </svg>,
    );
    expect(token.style.transition).toBe("transform 300ms linear");
  });

  it("憑かれていなければ神は描かない", () => {
    expect(renderToken().querySelector(".token-spirit")).toBeNull();
  });

  it("憑かれている駒には神を描く", () => {
    const spirit = renderToken({ spiritEmoji: "👺" }).querySelector(".token-spirit");
    expect(spirit).not.toBeNull();
    expect(spirit?.textContent).toBe("👺");
  });

  it("神は駒の真上に置く(左右の隣の駒と重ならない場所)", () => {
    const container = renderToken({ spiritEmoji: "👺" });
    // 揺れは内側の g に当てている。**CSS の transform は SVG の transform 属性を
    // 上書きする**ので、位置は外側の g が持っていなければならない。
    const positioned = container.querySelector(".token-spirit")?.parentElement;
    expect(positioned?.getAttribute("transform")).toBe("translate(0, -12)");
    expect(container.querySelector(".token-spirit")?.getAttribute("transform")).toBeNull();
  });

  it("神と運搬アイテムが同時に出るときは場所を譲り合う", () => {
    const both = renderToken({ spiritEmoji: "👺", carriedEmoji: "🪆" });
    const carried = [...both.querySelectorAll("text")].find((t) => t.textContent === "🪆");
    // 神は真上(x=0)。アイテムは右へ寄せる。重なると両方読めなくなる。
    expect(carried?.getAttribute("x")).toBe("12");

    const aloneCarried = [...renderToken({ carriedEmoji: "🪆" }).querySelectorAll("text")].find(
      (t) => t.textContent === "🪆",
    );
    expect(aloneCarried?.getAttribute("x")).toBe("0");
  });
});
