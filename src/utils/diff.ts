export function reverse(diff: string[]): string[] {
    const diffCopy = diff.slice();
    for (let i = 0; i < diffCopy.length; i++) {
        const math = diffCopy[i][0] === "-" ? "+" : "-";
        diffCopy[i] = math + diffCopy[i].slice(1);
    }
    return diffCopy;
}

export function merge(source: string[] = [], diff: string[]): string[] | null {
    const res = source.slice();

    for (let i = 0; i < diff.length; i++) {
        const math = diff[i][0];
        const publicKey = diff[i].slice(1);

        const index = res.indexOf(publicKey);
        if (math === "+" && index === -1) {
            res.push(publicKey);
        } else if (math === "-" && index !== -1) {
            res.splice(index, 1);
        }
    }
    return res.length > 0 ? res : null;
}

export default {
    reverse,
    merge
};