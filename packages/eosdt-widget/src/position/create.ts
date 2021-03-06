import { t } from "../globals";
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
}) {
  const { account, contract } = deps;

  return {
    state: {},

    onInit: async (w) => {
      const { events, refId } = w.ctx;

      w.update({
        form: Form({
          id: "create-position",
          className: "equil-position-manage__form",
          fields: {
            deposit: {
              decimals: 4,
              label: t`I want to deposit EOS`,
            },
            generate: {
              decimals: 2,
              label: t`And generate EOSDT`,
            },
          },
          // TODO add validation
          // buttonText: "Create position",
          handler: async (data?: FormData) => {
            if (data) {
              const [deposit, generate] = [
                Number(data.get("deposit")),
                Number(data.get("generate")),
              ];

              if (
                Number.isFinite(deposit) &&
                deposit > 0 &&
                Number.isFinite(generate) &&
                generate > 0
              ) {
                if (!refId) {
                  await contract.create(account.name, deposit, generate);
                } else {
                  await contract.createWithReferral(account.name, deposit, generate, refId);
                }
                events.emit("position:created");
              } else {
                throw new Error(t`Wrong data`);
              }
            } else {
              throw new Error(t`No data`);
            }
          },
        }),
      });
    },
    render: (state, r) => {
      return r`${state.form}`;
    },
  } as WidgetDef<CreatePositionState, Context>;
}
