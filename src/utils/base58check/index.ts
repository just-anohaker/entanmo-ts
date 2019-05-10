import assert from "assert";
import crypto from "crypto";
import base58 from "./base58";

function doubleSHA256(buffer: Buffer): Buffer {
    const tmp = crypto.createHash("sha256").update(buffer).digest();
    const result = crypto.createHash("sha256").update(tmp).digest();
    return result;
}

export function encode(payload: Buffer): string {
    const checksum = doubleSHA256(payload);
    return base58.encode(Buffer.concat([Uint8Array.from(payload), Uint8Array.from(checksum)], payload.length + 4));
}

function _decode(buffer: Buffer): Buffer | undefined {
    const payload = buffer.slice(0, -4);
    const checksum = buffer.slice(-4);
    const newCheckSum = doubleSHA256(payload);

    if (checksum[0] ^ newCheckSum[0]
        | checksum[1] ^ newCheckSum[1]
        | checksum[2] ^ newCheckSum[2]
        | checksum[3] ^ newCheckSum[3]) {
        return undefined;
    }

    return payload;
}

export function unsafeDecode(str: string): Buffer | undefined {
    const buffer = base58.decodeUnsafe(str);
    if (buffer === undefined) return undefined;

    return _decode(buffer);
}

export function decode(str: string): Buffer {
    const buffer = base58.decode(str);
    const payload = _decode(buffer);
    if (payload === undefined) {
        throw new Error("[base58check] Invalid checksum");
    }

    return payload;
}

export default {
    encode,
    decode,
    unsafeDecode
};