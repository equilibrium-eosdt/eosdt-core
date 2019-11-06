import {
  Account,
  TransactionProvider,
  TransactionProviderConfig,
} from "@eosdt/client";

import { Api } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { TextDecoder, TextEncoder } from "text-encoding";

export default (account: Account, privateKeys: string[]) =>
  class JSSigTransactionProvider implements TransactionProvider {
    public readonly api: Api;
    private loggedOut: boolean = false;

    constructor(config: TransactionProviderConfig) {
      const { rpc } = config;
      const signatureProvider = new JsSignatureProvider(privateKeys);
      const textDecoder = new TextDecoder();
      const textEncoder = new TextEncoder();

      this.api = new Api({
        rpc,
        signatureProvider,
        textDecoder,
        textEncoder,
      });
    }

    public get account() {
      return !this.loggedOut ? account : undefined;
    }

    public async init() {
      // no actual use here
    }

    public login = async () => {
      // no actual use here
    };

    public logout = async () => {
      this.loggedOut = true;
    };
  };
