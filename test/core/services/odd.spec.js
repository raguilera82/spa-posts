import { UtilsService } from "../../../src/core/services/utils.services";

describe("Odd", () => {
  it("3 is odd", () => {
    const num = 3;

    const result = UtilsService.isOdd(num);

    expect(result).toBe(true);
  });
});
