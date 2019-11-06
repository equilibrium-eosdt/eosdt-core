export declare type AnyFunc<T> = (...args: any[]) => T;
export declare type AnyAsyncFunc<T> = (...args: any[]) => Promise<T>;
export declare const RETRY_EXCEED = "RETRY_EXCEED";
export declare const TIMEOUT_EXCEED = "TIMEOUT_EXCEED";
export declare function withTimeout<T>(fn: AnyAsyncFunc<T> | AnyFunc<T>, timeout: number): AnyAsyncFunc<T>;
export declare function withRetry<T>(fn: AnyAsyncFunc<T> | AnyFunc<T>, num: number, exceptions?: string[]): AnyAsyncFunc<T>;
