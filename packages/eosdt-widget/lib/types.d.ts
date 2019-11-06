/// <reference types="node" />
import Client, { NetworkPool } from "@eosdt/client";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { EventEmitter } from "events";
import { Widget } from "./widget";
export interface Account {
    name: string;
    authority?: string;
    publicKey?: string;
    blockchain?: string;
    chainId?: string;
}
declare type TxObj = any;
declare type TxOpt = any;
export interface Theme {
    title: {
        color: string;
        font: string;
    };
    text: {
        color: string;
        font: string;
        boldFont: string;
    };
    button: {
        textColor: string;
        font: string;
        background: string;
    };
    background: {
        primary: string;
        secondary: string;
    };
    header: {
        color: string;
    };
}
export { PositionsContract as Contract };
export interface Position {
    position_id: number;
    maker: string;
    outstanding: string;
    governance: string;
    collateral: string;
}
export interface Context {
    refId?: number;
    client?: Client;
    theme?: Theme;
    baseUrl: string;
    events: EventEmitter;
    demo?: boolean;
}
export interface EquilibriumInjector {
    isReady: () => boolean;
    init: (accountName: string | undefined, networks: NetworkPool, onTransaction: (txObj: TxObj, options: TxOpt) => Promise<void>, options: {
        baseUrl?: string;
        refId?: number;
        theme?: Theme;
        demo?: boolean;
    }) => Promise<void>;
    setLocale: (locale: {
        [key: string]: string[];
    }) => void;
    getContext: () => Context;
    Widgets: {
        Position: (el: HTMLElement, options?: {
            iframe?: boolean;
            iframeUrl?: string;
            mobile?: string;
        }) => Widget<any, any> | null;
    };
}
export interface IFrameOptions {
    accountName: string | undefined;
    networks: NetworkPool;
    refId?: number;
    theme?: Theme;
}
