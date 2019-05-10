import assert from "assert";
import * as tweetnacl from "tweetnacl-ts";

export interface KeyPair {
    publicKey: Uint8Array,
    privateKey: Uint8Array
}

export function makeKeyPair(hash: Buffer): KeyPair {
    assert(hash.length === 32, "hash lenght must be sizeof 32");
    let keypair: tweetnacl.SignKeyPair;
    try {
        keypair = tweetnacl.sign_keyPair_fromSeed(Uint8Array.from(hash));
    } catch (e) {
        throw e;
    }

    return {
        publicKey: keypair.publicKey,
        privateKey: keypair.secretKey
    };
}

export function sign(hash: Buffer, keypair: KeyPair): Uint8Array {
    let signature: Uint8Array;
    try {
        signature = tweetnacl.sign_detached(Uint8Array.from(hash), keypair.privateKey);
    } catch (e) {
        throw e;
    }
    return signature;
}

export function verify(hash: Buffer, signature: Uint8Array, publicKey: Uint8Array): boolean {
    let result = false;
    try {
        result = tweetnacl.sign_detached_verify(Uint8Array.from(hash), signature, publicKey);
    } catch (e) {
        throw e;
    }
    return result;
}

export default {
    makeKeyPair,
    sign,
    verify
};