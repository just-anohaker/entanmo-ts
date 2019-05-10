const DEFAULT_LIMIT = 10000;

export class LimitCache {
    private readonly limit: number;
    private index: Array<string>;
    private cache: Map<string, any>;

    constructor(options?: { limit: number; }) {
        this.limit = DEFAULT_LIMIT;
        if (options) {
            this.limit = options.limit;
        }

        this.index = new Array<string>();
        this.cache = new Map<string, any>();
    }

    set(key: string, value: any): void {
        if (this.cache.size >= this.limit && !this.cache.has(key)) {
            const dropKey = this.index.shift();
            if (typeof dropKey === "string") {
                this.cache.delete(dropKey);
            }
        }

        this.cache.set(key, value);
        this.index.push(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }
}

export default LimitCache;