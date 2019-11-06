export type AnyFunc<T> = (...args: any[]) => T;
export type AnyAsyncFunc<T> = (...args: any[]) => Promise<T>;

export const RETRY_EXCEED = "RETRY_EXCEED";
export const TIMEOUT_EXCEED = "TIMEOUT_EXCEED";

export function withTimeout<T>(
  fn: AnyAsyncFunc<T> | AnyFunc<T>,
  timeout: number,
): AnyAsyncFunc<T> {
  return (...args: any[]) => {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(TIMEOUT_EXCEED)), timeout),
      ) as Promise<T>,
    ]);
  };
}

export function withRetry<T>(
  fn: AnyAsyncFunc<T> | AnyFunc<T>,
  num: number,
  exceptions: string[] = [TIMEOUT_EXCEED],
): AnyAsyncFunc<T> {
  return async (...args: any[]) => {
    for (let i = 0; i < num; ++i) {
      try {
        return await fn(...args);
      } catch (e) {
        if (exceptions.indexOf(e.message) < 0) {
          throw e;
        }
      }
    }

    throw new Error(RETRY_EXCEED);
  };
}
