import { Context } from "../types";
import { WidgetDef } from "../widget";
interface Deps {
    getUserBalanceEos?: () => number;
    getUserBalanceEosdt?: () => number;
    getUserBalanceNut?: () => number;
    getRates: () => any;
}
interface BalanceState {
    userBalanceEos?: number;
    userBalanceEosdt?: number;
    userBalanceNut?: number;
    rates?: number;
    baseUrl: string;
}
export default function Balances(deps: Deps): WidgetDef<BalanceState, Context>;
export {};
