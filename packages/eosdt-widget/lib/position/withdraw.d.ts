import { Account, Context, Contract } from "../types";
import Form from "../ui/form";
import { WidgetDef } from "../widget";
export interface WithdrawState {
    form?: ReturnType<typeof Form>;
}
export default function WithdrawEOS(deps: {
    account: Account;
    contract: Contract;
    maxToWithdrawFunc?: () => number | undefined;
}): WidgetDef<WithdrawState, Context>;
