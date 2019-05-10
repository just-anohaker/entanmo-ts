import BlockStatus from "../../src/utils/block-status";

test("block status tests", () => {
    // distance 10112000

    // milestone 0
    expect(BlockStatus.calcMilestone(1)).toBe(0);
    expect(BlockStatus.calcMilestone(5000000)).toBe(0);
    expect(BlockStatus.calcMilestone(10111999)).toBe(0);
    expect(BlockStatus.calcMilestone(10112000)).toBe(0);
    expect(BlockStatus.calcMilestone(10112001)).toBe(1);
    expect(BlockStatus.calcMilestone(10112000 * 2)).toBe(1);

    expect(BlockStatus.calcMilestone(10112000 * 3)).toBe(2);
    expect(BlockStatus.calcMilestone(10112000 * 4)).toBe(3);
    expect(BlockStatus.calcMilestone(10112000 * 5)).toBe(4);
    expect(BlockStatus.calcMilestone(10112000 * 6)).toBe(5);

    // over last milestone
    expect(BlockStatus.calcMilestone(10112000 * 6 + 100)).toBe(5);
    expect(BlockStatus.calcMilestone(10112000 * 7)).toBe(5);
    expect(BlockStatus.calcMilestone(10112000 * 8)).toBe(5);

    // exceptions
    expect(BlockStatus.calcMilestone(0)).toBe(0);
    expect(BlockStatus.calcMilestone(-(10112000 * 1 - 2))).toBe(0);
    expect(BlockStatus.calcMilestone(-(10112000 * 2 - 1))).toBe(2);
    expect(BlockStatus.calcMilestone(-(10112000 * 3 - 2))).toBe(2);
});