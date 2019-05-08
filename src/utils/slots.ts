function beginEpochTime(): Date {
    const d: Date = new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0));
    return d;
}

function getEpochTime(time: number | undefined): number {
    if (time === undefined) {
        time = (new Date()).getTime();
    }
    const d: Date = beginEpochTime();
    const t: number = d.getTime();
    return Math.floor((time - t) / 1000);
}

export const interval: number = 3;
export const delegates: number = 101;
export const numOfBlocksPerRound: number = 101 * 1;
export const powLeading: number = 7;
export const powTimeOut: number = 2;

export function getTime(time: number | undefined = undefined): number {
    return getEpochTime(time);
}

export function getRealTime(epochTime: number | undefined = undefined): number {
    if (epochTime === undefined) {
        epochTime = getTime();
    }

    const d: Date = beginEpochTime();
    const t: number = Math.floor(d.getTime() / 1000) * 1000;
    return t + epochTime * 1000;
}

export function getSlotNumber(epochTime: number | undefined): number {
    if (epochTime === undefined) {
        epochTime = getTime(undefined);
    }
    return Math.floor(epochTime / interval);
}

export function getSlotTime(slot: number): number {
    return slot * interval;
}

export function getNextSlot() {
    const slot: number = getSlotNumber(undefined);
    return slot + 1;
}

export function getLastSlot(nextSlot: number) {
    return nextSlot + delegates;
}

export function getNumOfBlocksPerDay() {
    return Math.floor(24 * 60 * 60 / interval);
}
