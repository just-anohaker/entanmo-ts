import crypto from "crypto";
import bs58check from "./base58check";

const NORMAL_PREFIX = "A";

export function isAddress(address: string): boolean {
    if (bs58check.unsafeDecode(address.slice(1)) === undefined) {
        return false;
    }

    if ([NORMAL_PREFIX].indexOf(address[0]) === -1) {
        return false;
    }

    return true;
}

export function generateAddress(publicKey: string): string;
export function generateAddress(publicKey: Uint8Array): string;
export function generateAddress(publicKey: Buffer): string;
export function generateAddress(publicKey: any): string {
    let buffPublicKey: Buffer;
    if (typeof publicKey === "string") {
        buffPublicKey = Buffer.from(publicKey, "hex");
    } else if (publicKey instanceof Uint8Array) {
        buffPublicKey = Buffer.from(publicKey);
    } else {
        buffPublicKey = publicKey;
    }

    const h1 = crypto.createHash("sha256").update(buffPublicKey).digest();
    const h2 = crypto.createHash("ripemd160").update(h1).digest();

    return NORMAL_PREFIX + bs58check.encode(h2);
}

export default {
    isAddress,
    generateAddress
};