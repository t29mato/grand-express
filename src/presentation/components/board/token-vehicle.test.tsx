import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { TrainToken } from "./train-token";
import { vehicleFor } from "./token-vehicle";

/**
 * 駒の乗り物。
 *
 * **太陽系の盤面で蒸気機関車が惑星のあいだを走っていた。**宇宙を「海」、
 * 天体を「島」として組んだ盤面なので、絵として成立していなかった
 * (遊ぶ人からそう言われて気づいた)。
 */
describe("駒の乗り物", () => {
  it("太陽系は探査機、ほかは機関車", () => {
    expect(vehicleFor("solarsystem")).toBe("spacecraft");
    for (const board of COUNTRY_INDEX) {
      if (board.id === "solarsystem") continue;
      expect(vehicleFor(board.id), `${board.id} は機関車のはず`).toBe("train");
    }
  });

  it("知らない盤面は機関車", () => {
    // 鉄道すごろくなので、既定は機関車でよい。
    expect(vehicleFor("atlantis")).toBe("train");
  });

  it("乗り物ごとに、実際に違う絵になる", () => {
    // **同じ絵を返していないことを確かめる。**片方を差し替えたつもりで
    // 両方とも機関車のまま、ということが起きうる。
    const draw = (vehicle: "train" | "spacecraft") =>
      render(
        <svg>
          <TrainToken x={0} y={0} color="#e0457b" isActive={false} vehicle={vehicle} />
        </svg>,
      ).container.innerHTML;
    const train = draw("train");
    const spacecraft = draw("spacecraft");
    expect(spacecraft).not.toBe(train);
    // 機関車には車輪(円)があり、探査機には無い。
    expect(train).toContain("cx=\"-5.6\"");
    expect(spacecraft).not.toContain("cx=\"-5.6\"");
  });
});
