import { EventEmitter } from "events"

export class Application extends EventEmitter {
    private readonly _singletons: Map<string, any> = new Map<string, any>();
    private readonly _singletonsModules: Map<string, any> = new Map<string, any>();
    private _inited: boolean = false;

    private static _sInstance: Application = new Application();

    static instance() {
        return Application._sInstance;
    }

    private constructor() {
        super();
    }

    async init(): Promise<void> {
        if (this._inited) {
            return;
        }

        // TODO: initilize
        this._inited = true;
    }

    getSingleton<T>(key: string): T {
        if (!this._singletons.has(key)) {
            throw new Error(`singletons match key(${key}) not found`);
        }

        return <T>(this._singletons.get(key));
    }

    private _setSingleton<T>(key: string, singleton: T): void {
        this._singletons.set(key, singleton);
    }

    setSingleton<T>(key: string, singleton: T): boolean {
        if (this._singletons.has(key)) {
            // TODO: WARNNING use replace
            return false;
        }
        this._setSingleton<T>(key, singleton);
        return true;
    }

    replaceSingleton<T>(key: string, singleton: T): boolean {
        if (!this._singletons.has(key)) {
            // TODO: WARNNING use set
        }
        this._setSingleton<T>(key, singleton);
        return true;
    }

    getModule<T>(key: string): T {
        if (!this._singletonsModules.has(key)) {
            throw new Error(`modules matched key(${key}) not found`);
        }
        return <T>(this._singletonsModules.get(key));
    }

    setModule<T>(key: string, module: T): boolean {
        if (this._singletonsModules.has(key)) {
            // TODO: ERROR replace forbidden
            return false;
        }

        this._singletonsModules.set(key, module);
        return true;
    }
}


export default Application;

