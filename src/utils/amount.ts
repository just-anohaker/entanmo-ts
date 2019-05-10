import * as bigjs from "big.js";

export function validate(amount: string): string | null {
    if (!/^[1-9][0-9]*$/.test(amount)) {
        return "Amount should be integer";
    }

    try {
        const bnAmount = new bigjs.Big(amount);
        if (bnAmount.lt(1) || bnAmount.gt("1e48")) {
            return "Invalid amount range";
        }
    } catch (e) {
        // e: NAN Error
        return "Failed to convert";
    }

    return null;
}

export function calcRealAmount(amount: bigjs.BigSource, precision: number): string {
    let bnNum: bigjs.Big;
    try {
        bnNum = new bigjs.Big(amount)
        while (precision > 0) {
            if (precision > 8) {
                bnNum = bnNum.div(Math.pow(10, 8));
            } else {
                bnNum = bnNum.div(Math.pow(10, precision));
            }
            precision -= 8;
        }
    } catch (e) {
        throw e;
    }

    return bnNum.toString();
}

export default {
    validate,
    calcRealAmount
};