import { describe, expect, it } from "vitest";
import { CityId, PropertyIndex, PropertyRef } from "./ids";

describe("PropertyRef", () => {
  it("CityIdとPropertyIndexから `city#index` 形式のキーを作れる", () => {
    const ref = PropertyRef.of(CityId("lapaz"), PropertyIndex(2));
    expect(ref).toBe("lapaz#2");
  });

  it("キーをCityIdとPropertyIndexに分解できる(往復する)", () => {
    const ref = PropertyRef.of(CityId("tokyo"), PropertyIndex(0));
    const parsed = PropertyRef.parse(ref);
    expect(parsed.cityId).toBe("tokyo");
    expect(parsed.index).toBe(0);
  });
});
