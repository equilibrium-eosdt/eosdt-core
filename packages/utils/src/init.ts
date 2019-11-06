export const waitForDocumentLoad = () =>
  new Promise((resolve) => {
    if (window.document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", () => setTimeout(() => resolve(), 100));
    }
  });

export const waitForLynx = (ms: number) => {
  let fn: () => void;

  return Promise.race([
    new Promise((resolve) => {
      fn = resolve;
      window.addEventListener("lynxMobileLoaded", fn);
    }),

    new Promise((_, reject) =>
      setTimeout(() => {
        if (fn) {
          window.removeEventListener("lynxMobileLoaded", fn);
        }

        reject(new Error(`Timeout[${ms} ms] ran out for lynx`));
      }, ms),
    ),
  ]);
};
