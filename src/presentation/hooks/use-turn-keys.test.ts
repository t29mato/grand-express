import { afterEach, describe, expect, it, vi } from "vitest";
import { advanceOpenModal, isNativeKeyTarget } from "./use-turn-keys";

/**
 * Space = 次へ(F-18)の DOM 側。モーダルは focus を受け渡さないので、
 * 開いているモーダルの進むボタンを探して押す。**1つに決まるときだけ。**
 */
describe("advanceOpenModal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  function mount(html: string) {
    document.body.innerHTML = html;
  }

  it("進むボタンが1つのモーダルは、それを押す", () => {
    mount(`<div class="overlay show"><div class="modal-box"><div class="btnrow"><button class="btn">Continue</button></div></div></div>`);
    const onClick = vi.fn();
    document.querySelector("button")!.addEventListener("click", onClick);
    expect(advanceOpenModal()).toBe(true);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("クイズのように選択肢(.opt)しか無いモーダルでは、勝手に選ばない", () => {
    mount(
      `<div class="overlay show"><div class="modal-box"><div class="btnrow"><button class="btn opt">A</button><button class="btn opt">B</button></div></div></div>`,
    );
    const onClick = vi.fn();
    document.querySelectorAll("button").forEach((b) => b.addEventListener("click", onClick));
    expect(advanceOpenModal()).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("モーダルが無ければ何もしない", () => {
    mount(`<div class="overlay"><div class="modal-box"><div class="btnrow"><button class="btn">x</button></div></div></div>`);
    expect(advanceOpenModal()).toBe(false);
  });

  it("重なっているときは、いちばん上(あと)のモーダルを進める", () => {
    mount(
      `<div class="overlay show"><div class="modal-box"><div class="btnrow"><button class="btn" id="under">a</button></div></div></div>` +
        `<div class="overlay show"><div class="modal-box"><div class="btnrow"><button class="btn" id="top">b</button></div></div></div>`,
    );
    const under = vi.fn();
    const top = vi.fn();
    document.getElementById("under")!.addEventListener("click", under);
    document.getElementById("top")!.addEventListener("click", top);
    expect(advanceOpenModal()).toBe(true);
    expect(top).toHaveBeenCalledOnce();
    expect(under).not.toHaveBeenCalled();
  });
});

describe("isNativeKeyTarget", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("ボタン・入力欄・role=button の上では横取りしない", () => {
    document.body.innerHTML = `<button id="b"></button><input id="i" /><div role="button" id="r"></div><aside tabindex="0" id="a"></aside>`;
    expect(isNativeKeyTarget(document.getElementById("b"))).toBe(true);
    expect(isNativeKeyTarget(document.getElementById("i"))).toBe(true);
    expect(isNativeKeyTarget(document.getElementById("r"))).toBe(true);
    // スクロールのために止まれるだけの要素は、Space をこちらで使ってよい。
    expect(isNativeKeyTarget(document.getElementById("a"))).toBe(false);
    expect(isNativeKeyTarget(document.body)).toBe(false);
    expect(isNativeKeyTarget(null)).toBe(false);
  });
});
