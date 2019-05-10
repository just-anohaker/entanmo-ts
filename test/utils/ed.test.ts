import crypto from "crypto";
import ed from "../../src/utils/ed";

test("ed tests", () => {
    const seed = "toy model enrich obvious winter ramp output health surge inherit scatter clown";
    const address = "AA9kCyRBH9qnBH61MaTksVp26xNKPq3PU2";
    const msg = "this is my test sign message";

    const hash = crypto.createHash("sha256").update(Buffer.from(seed, "utf-8")).digest();
    expect(hash.toString("hex")).toBe("9da7bd706863d683713dd696058367fec00cd16509ea19884d291466df6a45e6");

    const keypair = ed.makeKeyPair(hash);
    expect(Buffer.from(keypair.publicKey).toString("hex"))
        .toBe("793e6a4ef38c6392c5126c7adb1a8becedbfdd9b9fca7042abef18c644d11b1b");
    expect(Buffer.from(keypair.privateKey).toString("hex"))
        .toBe("9da7bd706863d683713dd696058367fec00cd16509ea19884d291466df6a45e6793e6a4ef38c6392c5126c7adb1a8becedbfdd9b9fca7042abef18c644d11b1b");

    const signature = ed.sign(Buffer.from(msg, "utf-8"), keypair);
    const verified = ed.verify(Buffer.from(msg, "utf-8"), signature, keypair.publicKey);

    expect(Buffer.from(signature).toString("hex"))
        .toBe("a78b66369fa03c29d64e756b0b3e6adf91e292fb5e983fabad7f612b53e8d6eb551955cb048a6ade853a39ccf91ceb46a7bed57cf4b17cd0c0136e118c03da0b");
    expect(verified).toBe(true);
});

