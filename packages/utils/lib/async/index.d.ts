import Mutex from "./mutex";
import Signal from "./signal";
export * from "./tools";
export { Mutex, Signal };
export declare const delay: (ms: number) => Promise<{}>;
