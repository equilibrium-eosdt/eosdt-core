import { Account, Context, Contract } from "../types";
import Form from "../ui/form";
import { WidgetDef } from "../widget";
export interface GenerateState {
    form?: ReturnType<typeof Form>;
}
export default function GenerateEOSDT(deps: {
    account: Account;
    contract: Contract;
    maxToGenerateFunc?: () => number | undefined;
}): WidgetDef<GenerateState, Context>;
