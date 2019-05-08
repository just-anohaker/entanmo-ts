"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function beginEpochTime() {
    const d = new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0));
    return d;
}
function getEpochTime(time) {
    if (time === undefined) {
        time = (new Date()).getTime();
    }
    const d = beginEpochTime();
    const t = d.getTime();
    return Math.floor((time - t) / 1000);
}
exports.interval = 3;
exports.delegates = 101;
exports.numOfBlocksPerRound = 101 * 1;
exports.powLeading = 7;
exports.powTimeOut = 2;
function getTime(time = undefined) {
    return getEpochTime(time);
}
exports.getTime = getTime;
function getRealTime(epochTime = undefined) {
    if (epochTime === undefined) {
        epochTime = getTime();
    }
    const d = beginEpochTime();
    const t = Math.floor(d.getTime() / 1000) * 1000;
    return t + epochTime * 1000;
}
exports.getRealTime = getRealTime;
function getSlotNumber(epochTime) {
    if (epochTime === undefined) {
        epochTime = getTime(undefined);
    }
    return Math.floor(epochTime / exports.interval);
}
exports.getSlotNumber = getSlotNumber;
function getSlotTime(slot) {
    return slot * exports.interval;
}
exports.getSlotTime = getSlotTime;
function getNextSlot() {
    const slot = getSlotNumber(undefined);
    return slot + 1;
}
exports.getNextSlot = getNextSlot;
function getLastSlot(nextSlot) {
    return nextSlot + exports.delegates;
}
exports.getLastSlot = getLastSlot;
function getNumOfBlocksPerDay() {
    return Math.floor(24 * 60 * 60 / exports.interval);
}
exports.getNumOfBlocksPerDay = getNumOfBlocksPerDay;
