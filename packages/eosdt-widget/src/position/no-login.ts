import { t } from "../globals";
import { Context } from "../types";
import { WidgetDef } from "../widget";

interface BalanceState {
  rates?: number;
  baseUrl: string;
}

export default function NoLogin() {
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

      const { baseUrl } = state;

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
      <div class="equil-position-manage__wrapper equil-position-manage__wrapper--loading">
        <h2 class="equil-position-manage__title">
          ${t`Create position`}
        </h2>
        <h2 class="equil-position-manage__parametersTitle">Login to create position</h2>
      </div>
      <div class="equil-position-manage__balanceAndPrice">
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Balance`}
          </h2>
          <div class="equil-user-balances">
            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/EOS.svg" alt="EOS" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOS</span>
                  <span>-</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>-</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/EOSDT.svg" alt="EOSDT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOSDT</span>
                  <span>-</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>-</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="${baseUrl}public/img/NUT.svg" alt="NUT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>NUT</span>
                  <span>-</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>-</span>
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
                  <span>$0</span>
              </div>
            </div>
            <div class="equil-rates__item">
              <img class="equil-rates__img" src="${baseUrl}public/img/NUT.svg" alt="NUT" />
              <div class="equil-rates__values">
                  <span>NUT</span>
                  <span>$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    },
  } as WidgetDef<BalanceState, Context>;
}
