import { Context, Contract, Position } from "../types";
import { Tabs } from "../ui";
import { WidgetDef } from "../widget";
import Balances from "./balances";
import CreatePosition from "./create";
import Parameters from "./parameters";
import Rates from "./rates";
export interface MPState {
    account?: {
        name: string;
        authority?: string;
        publicKey?: string;
        blockchain?: string;
        chainId?: string;
    };
    createPosition?: {
        id: string;
        type: ReturnType<typeof CreatePosition>;
    };
    parameters?: {
        id: string;
        type: ReturnType<typeof Parameters>;
    };
    userBalances?: {
        id: string;
        type: ReturnType<typeof Balances>;
    };
    currencyRates?: {
        id: string;
        type: ReturnType<typeof Rates>;
    };
    contract?: Contract;
    positions?: Position[];
    tabs?: ReturnType<typeof Tabs>;
    rates?: any;
    params?: any;
    settings?: any;
    balance?: string[];
    maxEos?: number;
    maxEosdt?: number;
    userBalanceEos?: number;
    userBalanceEosdt?: number;
    userBalanceNut?: number;
    minLtv: number;
    ltv?: number;
    eos: number;
    minRate?: number;
    eosdt: number;
    baseUrl: string;
    getNUTAmount?: (value: string) => number;
}
declare const ManagePosition: WidgetDef<MPState, Context>;
export default ManagePosition;
