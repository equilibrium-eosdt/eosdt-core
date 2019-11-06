import Client, { Account, NetworkPool } from "@eosdt/client";
// import { EosdtConnectorInterface } from "@eosdt/eosdt-js/dist/interfaces/connector";
// import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import transactCreator from "@eosdt/transact-creator";
import { EventEmitter } from "events";
import { version } from "../package.json";
import { setLocale, t } from "./globals";
import ManagePosition from "./position";
import NoLogin from "./position/no-login";
// import Demo from "./position/demo";
import { setStyles } from "./styles";
import { Context, EquilibriumInjector, IFrameOptions, Theme } from "./types";
import { Widget, WidgetDef } from "./widget";

interface State {
  loggedIn: boolean;
  // isDemo: boolean;
  // rates?: any;
  /*
  demoView?: {
    id: string;
    type: ReturnType<typeof Demo>;
  };
  */
}

const CreatePosition: WidgetDef<State, Context> = {
  state: {
    loggedIn: false,
    // isDemo: false,
  },

  onInit: async (w) => {
    const { events, client,
      // demo
    } = w.ctx;

    /*
    if (demo) {
      const contract = new PositionsContract(
        (client as any) as EosdtConnectorInterface,
      );
      const rates = await contract.getRates();
      w.update({ isDemo: true, rates });
    }
    */

    events.on("account", (state: { loggedIn: boolean }) => {
      const { loggedIn } = state;

      if (w.state.loggedIn !== loggedIn) {
        w.update({ loggedIn });
      }
    });

    if (!client) {
      throw new Error(t`Missing EOS client`);
    }

    if (client.account) {
      const { name } = client.account;
      const loggedIn = !!name;

      if (w.state.loggedIn !== loggedIn) {
        w.update(!name ? { loggedIn: false } : { loggedIn: true });
      }
    }

    /*
    const demoView = {
      id: "demo",
      className: "equil-position-manage",
      type: Demo({
        getRates: () => w.state.rates,
      }),
    };

    w.update({ demoView });
    */
  },

  render: (state, r) => {

    // const { demoView } = state;

    return r`${
      // state.isDemo ? {demoView} :
      state.loggedIn
        ? {
          id: "position",
          className: "equil-position-manage",
          type: ManagePosition,
        }
        : {
          id: "position-login",
          className: "equil-position-manage",
          type: NoLogin(),
        }
      }`;
  },
};

const stringifyOptions = (opts: { [name: string]: any }) =>
  new Buffer(JSON.stringify(opts)).toString("base64");

const iframeOptions: IFrameOptions = {
  accountName: undefined,
  networks: [],
};

const context: Context = {
  baseUrl: "",
  events: new EventEmitter(),
};

const Equilibrium: EquilibriumInjector = {
  isReady: () => !!context.client,
  init,
  setLocale,
  getContext: () => context,

  Widgets: {
    Position: injectPositionWidget,
  },
};

function injectPositionWidget(
  el: HTMLElement,
  options: {
    iframe?: boolean;
    iframeUrl?: string;
    mobile?: string;
  } = {},
) {
  if (!el) {
    return null;
  }

  if (options.iframe) {
    const url = options.iframeUrl || "https://cdn.eosdt.com/widget";

    el.innerHTML = `<iframe style="width: 100%; border: 0; min-height: 600px;" src="${url}/iframe-${version}.html#${stringifyOptions(
      iframeOptions,
    )}"></iframe>`;

    return null;
  } else {
    setStyles(el, context.theme, {
      baseUrl: context.baseUrl,
      mobile: options.mobile || "responsive",
    });

    return new Widget<State, Context>(el, CreatePosition, context);
  }
}

let postMessageHandler: ((e: Event) => Promise<void>) | undefined;

async function init(
  accountName: string | undefined,
  networks: NetworkPool,
  onTransaction: (txObj: any, options: any) => Promise<void>,
  options: {
    baseUrl?: string;
    refId?: number;
    theme?: Theme;
    // demo?: boolean;
  } = {},
) {
  iframeOptions.accountName = accountName;
  iframeOptions.networks = networks;

  if (options.baseUrl) {
    context.baseUrl = options.baseUrl;
  }

  if (options.theme) {
    iframeOptions.theme = options.theme;
    context.theme = options.theme;
  }

  if (options.refId) {
    iframeOptions.refId = options.refId;
    context.refId = options.refId;
  }

  /*
  if (options.demo) {
    context.demo = options.demo;
  }
  */

  if (postMessageHandler) {
    window.removeEventListener("message", postMessageHandler);
  }

  postMessageHandler = async (e: Event) => {
    e.stopImmediatePropagation();
    const { data } = e as any;

    if (typeof data === "string") {
      try {
        const data = JSON.parse((e as any).data);

        if (data.type === "transaction") {
          const { tx, opt } = data;

          if (tx) {
            await onTransaction(tx, opt);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  window.addEventListener("message", postMessageHandler);
  const client = new Client({ name: "eosdt-widget", networks });
  context.client = client;

  try {
    await client.init(
      transactCreator({
        account: () =>
          accountName ? ({ name: accountName } as Account) : undefined,
        init: () => Promise.resolve(),
        transact: onTransaction,
        login: () => Promise.resolve(),
        logout: () => Promise.resolve(),
      }),
    );

    const account = client.account;
    context.events.emit("account", { loggedIn: !!account });
    window.dispatchEvent(new Event("equilibrium:ready"));
  } catch (e) {
    console.error(e);
  }
}

export default Equilibrium;
