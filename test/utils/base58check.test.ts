import crypto from "crypto";

import base58check from "../../src/utils/base58check";
import base58 from "../../src/utils/base58check/base58";



const base58Tests: [string, string][] = [
    ["", ""],
    ["00000001", "1112"],
    ["61", "2g"],
    ["626262", "a3gV"],
    ["636363", "aPEr"],
    ["73696d706c792061206c6f6e6720737472696e67", "2cFupjhnEsSn59qHXstmK2ffpLv2"],
    ["00eb15231dfceb60925886b67d065299925915aeb172c06647", "1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L"],
    ["516b6fcd0f", "ABnLTmg"],
    ["bf4f89001e670274dd", "3SEo3LWLoPntC"],
    ["572e4794", "3EFU7m"],
    ["ecac89cad93923c02321", "EJDM8drfXA6uyA"],
    ["10c8511e", "Rt5zm"],
    ["00000000000000000000", "1111111111"],
    ["801184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd206ec97e", "5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD"],
    ["003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187", "16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS"]
];

test("base58 encode", () => {
    for (let pair of base58Tests) {
        expect(base58.encode(Buffer.from(pair[0], "hex"))).toBe(pair[1]);
    }
});

test("base58 decode tests", () => {
    for (let pair of base58Tests) {
        expect(base58.decode(pair[1]).toString("hex")).toBe(pair[0].toLowerCase());
    }
});

const base58checkTests: [string, string][] = [
    ["00f5f2d624cfb5c3f66d06123d0829d1c9cebf770e", "1PRTTaJesdNovgne6Ehcdu1fpEdX7913CK"],
    ["801E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD", "5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn"],
    ["801E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD01", "KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ"],
    ["0027b5891b01da2db74cde1689a97a2acbe23d5fb1", "14cxpo3MBCYYWCgF74SWTdcmxipnGUsPw3"],
    ["803aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6", "5JG9hT3beGTJuUAmCQEmNaxAuMacCTfXuw1R3FCXig23RQHMr4K"],
    ["803aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa601", "KyBsPXxTuVD82av65KZkrGrWi5qLMah5SdNq6uftawDbgKa2wv6S"],
    ["00086eaa677895f92d4a6c5ef740c168932b5e3f44", "1mayif3H2JDC62S4N3rLNtBNRAiUUP99k"],
    ["80eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19", "5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr"]
];

test("base58check encode tests", () => {
    for (let pair of base58checkTests) {
        expect(base58check.encode(Buffer.from(pair[0].toLowerCase(), "hex"))).toBe(pair[1]);
    }
});

test("base58check decode tests", () => {
    for (let pair of base58checkTests) {
        expect(base58check.decode(pair[1]).toString("hex")).toBe(pair[0].toLowerCase());
    }
});