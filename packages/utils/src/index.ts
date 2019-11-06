export * from "./async";
export * from "./init";

export function debugMessage(...args: any[]) {
  if (process.env.NODE_ENV === "development") {
    for (const arg of args) {
      console.info(typeof arg === "string" ? arg : JSON.stringify(arg, null, 2));
    }
  }
}
