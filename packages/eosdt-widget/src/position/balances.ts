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

export default function Balances(deps: Deps) {
  return {
    state: {
      baseUrl: "",
    },

    onInit: async (w) => {
      const {
        ctx: { baseUrl },
      } = w;

      w.update({
        baseUrl,
      });

      setInterval(() => {
        w.update();
      }, 6000);
    },

    render: (state, r) => {
      const {
        getUserBalanceEos,
        getUserBalanceEosdt,
        getUserBalanceNut,
        getRates,
      } = deps;

      const { baseUrl } = state;

      // TODO move to state; crap
      const userBalanceEos = getUserBalanceEos && getUserBalanceEos();
      const userBalanceEosdt = getUserBalanceEosdt && getUserBalanceEosdt();
      const userBalanceNut = getUserBalanceNut && getUserBalanceNut();
      const rates = getRates && getRates();

      const balanceToNumber = (balance: string) => {
        if (balance === undefined) {
          balance = "";
        }
        const x = balance.match(/[0-9,\.]+/g);
        if (x === null) {
          return 0;
        }
        return Number(x[0]);
      };

      let eosUsdRate;
      let nutUsdRate;
      let eosToUsd;
      let nutToUsd;
      if (rates.length) {
        nutUsdRate = balanceToNumber(rates[1].rate) * 100;
        eosUsdRate = balanceToNumber(rates[0].rate);
        eosToUsd = userBalanceEos ? userBalanceEos * eosUsdRate : "0.00";
        nutToUsd = userBalanceNut ? userBalanceNut * nutUsdRate : "0.00";
      }

      return r`
      <div class="equil-user-balances__item">
        <img class="equil-user-balances__img" src="${baseUrl}public/img/EOS.svg" alt="EOS" />
        <div class="equil-user-balances__values">
          <div>
            <span>EOS</span>
            <span>${Number(userBalanceEos).toFixed(4) || "0.00"}</span>
          </div>
          <div class="equil-user-balances__USDvalue">
            <span>USD</span>
            <span>$${Number(eosToUsd).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="equil-user-balances__item">
        <img class="equil-user-balances__img" src="${baseUrl}public/img/NUT.svg" alt="NUT" />
        <div class="equil-user-balances__values">
          <div>
            <span>NUT</span>
            <span>${Number(userBalanceNut).toFixed(4) || "0.00"}</span>
          </div>
          <div class="equil-user-balances__USDvalue">
            <span>USD</span>
            <span>$${Number(nutToUsd).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="equil-user-balances__item">
        <img class="equil-user-balances__img" src="${baseUrl}public/img/EOSDT.svg" alt="EOSDT" />
        <div class="equil-user-balances__values">
          <div>
            <span>EOSDT</span>
            <span>${Number(userBalanceEosdt).toFixed(2) || "0.00"}</span>
          </div>
          <div class="equil-user-balances__USDvalue">
            <span>USD</span>
            <span>$${Number(userBalanceEosdt).toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </div>
      `;
    },
  } as WidgetDef<BalanceState, Context>;
}
