import Mutex from "./mutex";
import Signal from "./signal";

export * from "./tools";

export { Mutex, Signal };

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
