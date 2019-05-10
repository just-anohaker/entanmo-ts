import crypto from "crypto";

import address from "../../src/utils/address";
import ed25519 from "../../src/utils/ed";

function _genaddress(source: string): string {
    const hash = crypto.createHash("sha256").update(source, "utf8").digest();
    const keypair = ed25519.makeKeyPair(hash);
    return address.generateAddress(keypair.publicKey);
}

const generateaddressTests: [string, string][] = [
    ["ribbon job prize example identify hat mistake element act version cheese mistake", "ANihGJij5fqUz6BAKeG7GNmex1UmhMFTzx"],
    ["treat protect release mansion barrel canvas cancel notable state swim flavor gloom", "ADxmooJdUWcmVB1YwX1qxHkBM3nWGeFZbx"],
    ["large stamp divorce math prepare insane drastic ten ocean relax antique before", "AANeNYhhhDnaXZPzAMYntdfAhCfrDaBUXW"],
    ["drum twenty mobile nest fruit hover off garment version glide spot shift", "ANPR9X3WLNTF6X7Y8VFJyXPYjCA2V7aYjU"],
    ["exhaust joy season play learn barely fame used project near fuel first", "ACk95auTDHQMW8eskFK8WuNP2c6xTikBLu"]
];

test("generateAddress tests", () => {
    for (let pair of generateaddressTests) {
        expect(_genaddress(pair[0])).toBe(pair[1]);
    }
});

const isaddressTests: [string, boolean][] = [
    // valid
    ["A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr", true],
    ["A5zpdYa1jByJCM5sqG4w3LKeDS5VtQDega", true],
    ["AFJLKzdxBNcttXL43tnajTuirSKrJFgq1x", true],
    ["ADsJqPjHALzCJtFhuD5k63Ar2SmkL9v1xa", true],

    // invalid
    ["A9mHydu4PJd3KnSbi1p6vwuoBMGcHc4xjr", false],
    ["A5zpDYa1jByJCM5sqG4w3LKeDS5VtQDega", false],
    ["AFJLKZdxBNcttXL43tnajTuirSKrJFgq1x", false],
    ["ADsJqPjHALzCJtFhuD5k63ArSmkL9v1xa", false],
];

test("isAddress tests", () => {
    for (let pair of isaddressTests) {
        expect(address.isAddress(pair[0])).toBe(pair[1]);
    }
});