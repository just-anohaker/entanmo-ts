import diff from "../../src/utils/diff";

test("diff reserve", () => {
    const source: string[] = [
        "+hello",
        "-world",
        "+hello world"
    ];
    const dest: string[] = [
        "-hello",
        "+world",
        "-hello world"
    ];
    expect(diff.reverse(source)).toEqual(dest);
    // console.log(diff.reverse(source));

    source.push("hello world");
    dest.push("-ello world");
    expect(diff.reverse(source)).toEqual(dest);
});

test("diff merge", () => {
    const source: string[] = [
        "hello",
        "world",
        "hello world"
    ];

    const diffArr: string[] = [
        "-hello",
        "+Hello",
        "-Hello",
        "+Hello",
        "-hello",
        "+world",
        "+world"
    ];

    const dest: string[] = [
        "world",
        "hello world",
        "Hello",
    ];
    expect(diff.merge(source, diffArr)).toEqual(dest);

    diffArr.push("-world");
    diffArr.push("-hello world");
    diffArr.push("-Hello");
    expect(diff.merge(source, diffArr)).toBeNull();
});