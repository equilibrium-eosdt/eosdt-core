import { t } from "../globals";
import { Context } from "../types";
import { WidgetDef } from "../widget";

interface Deps {
  getRates: () => any;
}

interface DemoState {
  rates?: number;
  baseUrl: string;
}

export default function Demo(deps: Deps) {
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

      setInterval(() => w.update(), 60000);
    },

    render: (state, r) => {
      const { getRates } = deps;

      const { baseUrl } = state;

      const rates = getRates && getRates();
      console.info(state);

      const balanceToNumber = (balance: string) => {
        if (balance === undefined) { balance = ""; }
        const x = balance.match(/[0-9,\.]+/g);
        if (x === null) { return 0; }
        return Number(x[0]);
      };

      let eosUsdRate;
      let nutUsdRate;

      const demoEOS = 20;
      const demoNUT = 7;

      let demoEOStoUSD;
      let demoNUTtoUSD;

      if (rates.length) {
        nutUsdRate = (balanceToNumber(rates[1].rate) * 100).toFixed(2);
        eosUsdRate = balanceToNumber(rates[0].rate).toFixed(2);

        demoEOStoUSD = (balanceToNumber(rates[0].rate) * 100 * demoEOS).toFixed(2);
        demoNUTtoUSD = (balanceToNumber(rates[1].rate) * 100 * demoNUT).toFixed(2);
      }

      return r`
      <div class="equil-position-manage__header">
        <a
          class="equil-position-manage__logo"
          href="https://eosdt.com/"
          target="_blank"
        >
          <img src="${baseUrl}public/img/logo.svg" />
        </a>
        <a
          class="equil-position-manage__telegram"
          href="https://t.me/equilibrium_eosdt_official"
          target="_blank"
        >Join us in Telegram</a>
      </div>
      <div class="equil-position-manage__wrapper">
        <div class="equil-position-actions">
          <h2 class="equil-position-manage__title">
            ${t`Create position`}
          </h2>
          <div class="create-position-3">
            <form class="create-position-4 equil-position-manage__form">

              <div class="equil-position-manage__input-wrapper">
                <label class="equil-position-manage__input-label">${t`I want to deposit EOS`}</label>
                <input class="equil-position-manage__input null" placeholder="0.00" type="number" autocomplete="off" name="deposit" step="0.0001">
              </div>
              <div class="equil-position-manage__input-wrapper">
                <label class="equil-position-manage__input-label">${t`And generate EOSDT`}</label>
                <input class="equil-position-manage__input null" placeholder="0.00" type="number" autocomplete="off" name="generate" step="0.0001">
              </div>

              <button class="equil-position-manage__button" disabled>${t`OK`}</button>
            </form>
          </div>
        </div>
        <div class="equil-position-parameters equil-position-parameters--empty">
          <h2 class="equil-position-manage__parametersTitle">${t`You don't have any positions yet`}</h2>
            <span class="equil-position-parameters__title">
            ${t`Deposit collateral and generate <br/>EOSDT to get started`}
            </span>
        </div>
      </div>
      <div class="equil-position-manage__balanceAndPrice">
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Balance`}
          </h2>
          <div class="equil-user-balances">

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/EOSDT.svg" alt="EOSDT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOS</span>
                  <span>${demoEOS}</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>$${demoEOStoUSD || "0"}</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/NUT.svg" alt="NUT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>NUT</span>
                  <span>${demoNUT}</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>$${demoNUTtoUSD || "0"}</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/EOSDT.svg" alt="EOSDT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOSDT</span>
                  <span>0</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>$0</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Price`}
          </h2>
          <div class="rates-5 equil-rates">
            <div class="equil-rates__item">
              <img class="equil-rates__img" src="${baseUrl}public/img/EOS.svg" alt="EOS" />
              <div class="equil-rates__values">
                  <span>EOS</span>
                  <span>$${eosUsdRate || "0"}</span>
              </div>
            </div>
            <div class="equil-rates__item">
              <img class="equil-rates__img" src="${baseUrl}public/img/NUT.svg" alt="NUT" />
              <div class="equil-rates__values">
                  <span>NUT</span>
                  <span>$${nutUsdRate || "0"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    },
  } as WidgetDef<DemoState, Context>;
}
