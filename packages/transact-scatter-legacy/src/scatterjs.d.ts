// tslint:disable:member-access
// tslint:disable:max-classes-per-file
declare module "@scatterjs/core" {
  export interface Account {
    blockchain: string;
    name: string;
    authority: string;
  }

  interface Scatter {
    account: (blochain: string) => Account | undefined;
    connect: (name: string, options: { network: any }) => Promise<boolean>;
    eos: (network: any, ApiConstructor: any, options?: { rpc?: any }) => any;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    plugins(...plugins: Plugin[]): void;
  }

  const scatter: Scatter;

  export default scatter;

  export class Network {
    constructor(...args: any[]);
    fullhost(): any;
    unique(): any;
    static fromJson(b: any): any;
    static placeholder(): any;
  }

  export class Plugin {
    constructor(...args: any[]);
    isSignatureProvider(): any;
    isValid(): any;
    static fromJson(b: any): any;
    static placeholder(): any;
  }

  export class SocketService {
    constructor(b: any, c: any);
    addEventHandler(a: any, b: any): void;
    disconnect(): any;
    getOrigin(): any;
    isConnected(): any;
    isPaired(): any;
    link(...args: any[]): any;
    pair(...args: any[]): any;
    removeEventHandler(a: any): void;
    send(...args: any[]): void;
    sendApiRequest(a: any): any;
    static getOriginOrPlugin(a: any): any;
  }

  export const Blockchains: {
    EOS: string;
    ETH: string;
    TRX: string;
  };

  export const EVENTS: {
    Disconnected: string;
    LoggedOut: string;
  };

  export const PluginTypes: {
    BLOCKCHAIN_SUPPORT: string;
    WALLET_SUPPORT: string;
  };

  export const WALLET_METHODS: {
    addEventHandler: string;
    addToken: string;
    authenticate: string;
    createTransaction: string;
    disconnect: string;
    forgetIdentity: string;
    getAllAccountsFor: string;
    getArbitrarySignature: string;
    getAvatar: string;
    getIdentity: string;
    getIdentityFromPermissions: string;
    getPublicKey: string;
    getVersion: string;
    hasAccountFor: string;
    isConnected: string;
    isPaired: string;
    linkAccount: string;
    listen: string;
    removeEventHandler: string;
    requestSignature: string;
    requestTransfer: string;
    suggestNetwork: string;
    updateIdentity: string;
  };

  export function WalletInterface(b: any, c: any, d: any): any;

  export namespace WalletInterface {
    function bindBasics(a: any): any;
  }
}

declare module "@scatterjs/eosjs" {
  class Plugin {
    constructor(...args: any[]);
    isSignatureProvider(): any;
    isValid(): any;
    static fromJson(b: any): any;
    static placeholder(): any;
  }

  export default Plugin;
}

declare module "eosjs";
