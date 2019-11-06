/// <reference path="../src/scatterjs.d.ts" />
import { TransactionProvider, TransactionProviderConfig } from "@eosdt/client";
import { Plugin } from "@scatterjs/core";
import { Api } from "eosjs";
declare type PluginFactory = () => Plugin;
export default class ScatterTransactionProvider implements TransactionProvider {
    protected static plugins: PluginFactory[];
    private eos?;
    private name;
    private network;
    private rpc;
    constructor(config: TransactionProviderConfig);
    readonly account: import("@scatterjs/core").Account | undefined;
    readonly api: Api;
    init: () => Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
export {};
