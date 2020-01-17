import { Context } from "../types";
import { WidgetDef } from "../widget";
interface Deps {
    getRates: () => any;
}
interface DemoState {
    rates?: number;
    baseUrl: string;
}
export default function Demo(deps: Deps): WidgetDef<DemoState, Context>;
export {};
