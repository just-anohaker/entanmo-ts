
import constants from "./constants";
import slots from "./slots";

function _parseHeight(height: number): number;
function _parseHeight(height: string): number;
function _parseHeight(height: any): number {
    let nHeight: number;
    if (typeof height === "string") {
        nHeight = Number.parseInt(height);
    } else if (typeof height === "number") {
        nHeight = height;
    } else {
        throw new Error("unsupported block height format");
    }
    if (!Number.isSafeInteger(nHeight)) {
        throw new Error("Invalid block height");
    }

    return Math.abs(nHeight);
}

class _BSC {
    static readonly cMilestones: number[] = [
        600000000,
        500000000,
        400000000,
        400000000,
        300000000,
        200000000,
    ];

    static readonly cBonuses: number[] = [
        100000000,
        50000000,
        25000000,
        25000000,
        25000000,
        26000000
    ];

    static readonly cDistance: number = 10112000;

    static readonly cRewardOffset: number = 1;

    static readonly cLastRewardHeight: number = 59328000;
}

export class BlockStatus {
    static calcMilestone(height: number): number {
        const location = Math.floor(_parseHeight(height - _BSC.cRewardOffset) / _BSC.cDistance);
        const lastMile = _BSC.cMilestones[_BSC.cMilestones.length - 1];

        if (location > (_BSC.cMilestones.length - 1)) {
            return _BSC.cMilestones.lastIndexOf(lastMile);
        } else {
            return location;
        }
    }

    static calcReward(height: number): number {
        height = _parseHeight(height);
        if (height < _BSC.cRewardOffset || height <= 1 || height > _BSC.cLastRewardHeight) {
            return 0;
        }

        return _BSC.cMilestones[BlockStatus.calcMilestone(height)];
    }

    static calcDelegateVotersBonus(height: number): number {
        height = _parseHeight(height);
        if (height < _BSC.cRewardOffset || height <= 1 || height > _BSC.cLastRewardHeight) {
            return 0;
        }

        return _BSC.cBonuses[BlockStatus.calcMilestone(height)];
    }

    static calcSupply(height: number): number {
        height = _parseHeight(height);
        height -= height % slots.cNumOfBlocksPerRound;
        const milestone = BlockStatus.calcMilestone(height);
        let supply = constants.cTotalAmount;
        const rewards: [number, number][] = [];

        if (height <= 0) {
            return supply;
        }

        if (height > _BSC.cLastRewardHeight) {
            return 24000000000000000;
        }

        let amount = 0;
        let multiplier = 0;
        height = height - _BSC.cRewardOffset + 1;
        for (let i = 0; i < _BSC.cMilestones.length; i++) {
            if (milestone < i) {
                break;
            }
            multiplier = _BSC.cMilestones[i];
            if (height <= 0) {
                break;
            } else if (height < _BSC.cDistance) {
                amount = height % _BSC.cDistance;
            } else {
                amount = _BSC.cDistance;
            }
            rewards.push([amount, multiplier]);
            height -= _BSC.cDistance;
        }
        if (height > 0) {
            rewards.push([height, _BSC.cMilestones[_BSC.cMilestones.length - 1]]);
        }

        for (let r of rewards) {
            supply += r[0] * r[1];
        }
        if (_BSC.cRewardOffset <= 1) {
            supply -= _BSC.cMilestones[0];
        }
        return supply;
    }
}

export default BlockStatus;