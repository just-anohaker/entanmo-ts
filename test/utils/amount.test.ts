import amount from "../../src/utils/amount";

test("validate tests", () => {
    const kErrorFormat: string = "Amount should be integer";
    const kErrorRange: string = "Invalid amount range";
    const kErrorNaN: string = "Failed to convert";
    expect(amount.validate("hello")).toBe(kErrorFormat);
    expect(amount.validate("19203a")).toBe(kErrorFormat);
    expect(amount.validate("0")).toBe(kErrorFormat);
    expect(amount.validate("10203")).toBe(null);

    let overrange: string = "1";
    for (let i = 0; i < 50; i++) {
        overrange += "0";
    }
    expect(amount.validate(overrange)).toBe(kErrorRange);

    // TODO: big.js exception
});