import Signal from "./signal";

export * from "./tools";

export { Signal };

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
