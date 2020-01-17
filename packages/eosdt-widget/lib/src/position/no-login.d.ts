import { Context } from "../types";
import { WidgetDef } from "../widget";
interface BalanceState {
    rates?: number;
    baseUrl: string;
}
export default function NoLogin(): WidgetDef<BalanceState, Context>;
export {};
