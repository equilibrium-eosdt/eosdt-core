import { EquilibriumInjector, IFrameOptions } from "./types";

type TopWindow = typeof window.top;

function parseLocationHash(): IFrameOptions {
  const hash = window.location.hash.slice(1);
  const raw = JSON.parse(new Buffer(hash, "base64").toString());

  const accountName = raw.accountName || undefined;
  const networks = raw.networks;
  const refId = raw.refId;
  const theme = raw.theme;

  if (accountName && typeof accountName !== "string") {
    throw new Error("accountName parameter is invalid");
  }

  if (!Array.isArray(networks)) {
    throw new Error("networks parameter is invalid");
  }

  return { accountName, networks, refId, theme };
}

function watchLocationHashChange(fn: () => void) {
  let prevHash = window.location.hash;

  setInterval(() => {
    if (prevHash !== window.location.hash) {
      prevHash = window.location.hash;
      fn();
    }
  }, 200);
}

function onWidgetLoad(
  Equilibrium: EquilibriumInjector,
  options: IFrameOptions,
  top: TopWindow,
) {
  Equilibrium.init(
    options.accountName,
    options.networks,
    async (tx: any, opt: any) => {
      top.postMessage(JSON.stringify({ type: "transaction", tx, opt }), "*");
      return { transaction_id: "" } as any;
    },
    { refId: options.refId, theme: options.theme },
  );
}

function onWidgetReady(
  Equilibrium: EquilibriumInjector,
  target: HTMLElement,
) {
  Equilibrium.Widgets.Position(target);
}

window.addEventListener("equilibrium:loaded", () => {
  try {
    const options = parseLocationHash();

    if (window.top) {
      onWidgetLoad(
        (window as any).Equilibrium as EquilibriumInjector,
        options,
        window.top,
      );

      watchLocationHashChange(() => {
        try {
          const options = parseLocationHash();
          onWidgetLoad(
            (window as any).Equilibrium as EquilibriumInjector,
            options,
            window.top,
          );
        } catch (e) {
          document.body.innerHTML = `<p style="color: red;">${e.message}</p>`;
        }
      });
    } else {
      throw new Error("Should be in iFrame");
    }
  } catch (e) {
    document.body.innerHTML = `<p style="color: red;">${e.message}</p>`;
  }
});

window.addEventListener("equilibrium:ready", () => {
  try {
    const target = document.querySelector("#root");

    if (!target) {
      throw new Error("no root element");
    }

    onWidgetReady(
      (window as any).Equilibrium as EquilibriumInjector,
      target as HTMLElement,
    );
  } catch (e) {
    document.body.innerHTML = `<p style="color: red;">${e.message}</p>`;
  }
});
