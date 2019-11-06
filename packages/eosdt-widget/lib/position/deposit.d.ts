import { Account, Context, Contract } from "../types";
import Form from "../ui/form";
import { WidgetDef } from "../widget";
export interface DepositState {
    form?: ReturnType<typeof Form>;
}
export default function DepositEOS(deps: {
    account: Account;
    contract: Contract;
    maxToDepositFunc?: () => number | undefined;
}): WidgetDef<DepositState, Context>;
