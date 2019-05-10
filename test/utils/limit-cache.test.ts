import LimitCache from "../../src/utils/limit-cache";

test("LimitCache tests", () => {
    let inst: LimitCache = new LimitCache({ limit: 1 });
    expect(inst.has("hello world")).toBe(false);

    inst.set("hello world", null);
    expect(inst.has("hello world")).toBe(true);
    inst.set("hello world", "hello world");
    expect(inst.has("hello world")).toBe(true);
    inst.set("world", null);
    expect(inst.has("world")).toBe(true);
    expect(inst.has("hello world")).toBe(false);
});

test("LimitCache tests", () => {
    let inst: LimitCache = new LimitCache({ limit: 2 });
    expect(inst.has("hello world")).toBe(false);

    inst.set("hello world", null);
    expect(inst.has("hello world")).toBe(true);

    inst.set("hello", null);
    expect(inst.has("hello")).toBe(true);
    expect(inst.has("hello world")).toBe(true);

    inst.set("world", null);
    expect(inst.has("world")).toBe(true);
    expect(inst.has("hello")).toBe(true);
    expect(inst.has("hello world")).toBe(false);
});