import { Account, Contract } from "../types";
import { Context } from "../types";
import Form from "../ui/form";
import { WidgetDef } from "../widget";
export interface CreatePositionState {
    form?: ReturnType<typeof Form>;
}
export default function CreatePosition(deps: {
    account: Account;
    contract: Contract;
}): WidgetDef<CreatePositionState, Context>;
