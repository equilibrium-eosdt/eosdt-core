import { autoIncrement } from "./globals";
import { Theme } from "./types";

const styles = (
  id: string,
  theme: Theme,
  baseUrl: string,
  mobile: string,
  baseFontSize: string,
) => `
  @font-face {
    font-family: Geometria;
    src: url("${baseUrl}public/fonts/Geometria.woff2") format("woff2"),
      url("${baseUrl}public/fonts/Geometria.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: Geometria-Bold;
    src: url("${baseUrl}public/fonts/Geometria-Bold.woff2") format("woff2"),
      url("${baseUrl}public/fonts/Geometria-Bold.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: Geometria-Heavy;
    src: url("${baseUrl}public/fonts/Geometria-Heavy.woff2") format("woff2"),
      url("${baseUrl}public/fonts/Geometria-Heavy.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  #${id} {
    display: flex;
    flex-flow: column nowrap;
      margin: 0;
      font-family: "Geometria";
      font-size: 14px;
      color: #002446;
  }

  #${id} div,
  #${id} input,
  #${id} p,
  #${id} ul {
    box-sizing: border-box;
  }

  #${id} h2 {
    font-weight: 400;
  }


  #${id} .equil-position-manage {
    display: flex;
    justify-content: space-between;
    min-height: 450px;

    padding-bottom: 35px;
    padding-top: 100px;

    padding-left: 2.75%;
    padding-right: 2.75%;

    position: relative;
    width: 100%;
    background: white;

    font-size: ${baseFontSize};
  }

  #${id} .equil-position-manage__header {
    width: 100%;
    height: 55px;
    background: ${theme.header.color};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 2.75%;
    padding-right: 2.75%;
  }

  #${id} .equil-position-manage__header a {
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    font-family: 'Geometria-Bold', serif;
    position: relative;
  }

  #${id} .equil-position-manage__logo {
    display: flex;
    align-items: center;
  }

  #${id} .equil-position-manage__telegram::after {
    content: "";

    position: absolute;
    top: -3px;
    left: -34px;

    width: 29px;
    height: 24px;

    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyOCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuMTA5NiAwLjE1NTI4MUwxLjMwNzE0IDkuNzIxNjRDLTAuMzg1NjY5IDEwLjQwMDggLTAuMzc1NjI5IDExLjM0NSAwLjk5ODU4NiAxMS43NjZMNy4xODQzOSAxMy42OTY3TDkuNTUxMjMgMjAuOTUzM0M5LjgzODk2IDIxLjc0NzUgOS42OTcxMiAyMi4wNjI1IDEwLjUzMTEgMjIuMDYyNUMxMS4xNzQ4IDIyLjA2MjUgMTEuNDYwMyAyMS43NjkgMTEuODE4OCAyMS40MTg5QzEyLjA0NjcgMjEuMTk1OCAxMy40MDAyIDE5Ljg3OTkgMTQuOTExNSAxOC40MTA1TDIxLjM0NTkgMjMuMTY0NUMyMi41Mjk5IDIzLjgxNzcgMjMuMzg0OCAyMy40NzkzIDIzLjY3OTcgMjIuMDY0OUwyNy45MDMzIDIuMTYxMjVDMjguMzM1OCAwLjQyNzU0NiAyNy4yNDI0IC0wLjM1ODg1MSAyNi4xMDk2IDAuMTU1MjgxWk04LjE1NTE4IDEzLjI1MzFMMjIuMDk4IDQuNDU2NTJDMjIuNzk0MSA0LjAzNDQgMjMuNDMyMyA0LjI2MTM1IDIyLjkwODMgNC43MjY0OEwxMC45Njk2IDE1LjQ5ODJMMTAuNTA0NyAyMC40NTYzTDguMTU1MTggMTMuMjUzMVYxMy4yNTMxWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=);
  }

  #${id} .equil-position-manage__header a:hover {
    text-decoration: none;
  }

  #${id} .equil-position-manage__wrapper {
    border: 1px solid ${theme.background.secondary};
    border-radius: 3px;

    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;

    flex: 0 0 75%;

    padding: 30px;
    padding-left: 2.75%;
    padding-right: 2.75%;
  }

   #${id} .equil-position-manage__wrapper--loading {
      align-items: center;
      justify-content: center;
   }

  #${id} .equil-position-manage__balanceAndPrice {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    padding-left: 2.5%;
    flex: 0 0 25%;
  }

  #${id} .equil-position-manage__balanceAndPrice .equil-position-manage__wrapper {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    min-width: 310px;
    flex: 1 0 auto;
    min-width: unset;
  }

  #${id} .equil-position-manage__balanceAndPrice .equil-position-manage__wrapper:first-of-type {
    margin-bottom: 35px;
  }

  #${id} .equil-user-balances {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #${id} .equil-user-balances__item {
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 15px;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.background.secondary};
  }

  #${id} .equil-user-balances__item:last-of-type {
    border-bottom: none;
  }

  #${id} .equil-user-balances__img {
    width: 19px;
    height: 25px;
    margin-right: 14px;
  }

  #${id} .equil-user-balances__values {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-height: 40px;
  }

  #${id} .equil-user-balances__values > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #${id} .equil-user-balances__USDvalue {
    font-size: 12px;
    line-height: 15px;
    color: #33333380;
  }

  #${id} .equil-rates {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #${id} .equil-rates__item {
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 15px;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.background.secondary};
  }

  #${id} .equil-rates__item:last-of-type {
    border-bottom: none;
  }

  #${id} .equil-rates__img {
    width: 19px;
    height: 25px;
    margin-right: 14px;
  }

  #${id} .equil-rates__values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
  }

  #${id} .equil-position-parameters {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 15px;
    background: ${theme.background.secondary};

    max-width: 48%;
    padding-left: 2.75%;
    padding-right: 2.75%;
    flex: 1 0 auto;
    border-radius: 3px;
  }

  #${id} .equil-position-parameters--empty {
    justify-content: flex-start;
  }

  #${id} .equil-position-actions {
    flex: 1 0 auto;
    margin-right: 5%;
    max-width: 47%;
  }

  #${id} .equil-position-actions > div {
    height: 100%;
  }

  #${id} .equil-position-actions > div.equil-position-actions__labels {
    height: unset;
  }

  #${id} .create-position-2,
  #${id} .create-position-3,
  #${id} .create-position-5 {
    height: 100%;
  }

  #${id} .equil-position-actions__labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    margin-bottom: 30px;
  }

  #${id} .equil-position-actions__label {
    height: 50px;
    flex: 0 0 48%;
    max-width: 48%;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.text.color};
    background: ${theme.background.secondary};
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    padding: 10px;

    padding-left: 3.75%;
    padding-right: 3.75%;

    font-size: 0.8575em;
    white-space: nowrap;
  }

  #${id} .equil-position-parameters__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #0024461a;
    min-height: 29px;
    width: 100%;
  }

  #${id} .equil-position-parameters__item:last-of-type {
    border-bottom: 1px solid transparent;
  }

  #${id} .equil-position-parameters__title {
    font-size: 12px;
  }

  #${id} .equil-position-parameters__value,
  #${id} .equil-position-actions__value {
    font-family: ${theme.text.boldFont};
    font-size: 12px;
    text-align: right;
  }

  #${id} .equil-position-manage__parametersTitle {
    font-family: ${theme.title.font};
    color: #333;
    font-size: 20px;
    line-height: 25px;
    margin-top: 0;

    margin-bottom: 7%;
  }


  #${id} .equil-position-manage__title {
    position: absolute;
    top: -27px;
    left: 0;

    font-family: ${theme.text.boldFont};
    font-size: 14px;
    font-weight: bold;
    color: #333;

    margin: 0;
  }

  #${id} .equil-position-userParams {
    margin-top: auto;
    width: 100%;
  }

  #${id} .equil-position-userParams__param {
   display: flex;
   justify-content: space-between;
  }

  #${id} .equil-position-userParams__title {
    font-size: 12px;
    line-height: 15px;
    color: #002446;
   }

   #${id} .equil-position-userParams__number {
    font-size: 12px;
    line-height: 15px;
    font-family: Geometria-Bold;
    color: #002446;
   }


   #${id} .equil-position-userParams__param:first-child {
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,36,70,0.100);
   }

   #${id} .equil-position-userParams__param:last-child {
    padding-top: 8px;
   }

  #${id} .equil-position-manage__username {
  }

  #${id} .equil-position-manage__tab-container {
    display: flex;
    flex-flow: column nowrap;
  }

  #${id} .equil-position-manage__tabs {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    list-style: none;
    padding-left: 0px;
    font-size: 16px;
    margin-top: 0;
  }

  #${id} .equil-position-manage__tab {
    border-bottom: 2px #fff solid;
    cursor: pointer;
    font-family: ${theme.text.boldFont};
    color: ${theme.text.color};
    opacity: 0.5;
  }

  #${id} .equil-position-manage__tab--active {
    border-bottom: 2px #0024461a solid;
    opacity: 1;
  }

  #${id} .equil-position-manage__error {
    color: red;
    position: absolute;
    top: 180px;
    font-size: 12px;
  }

  #${id} .equil-position-manage__form--tab .equil-position-manage__error {
    top: 50px;
  }

  #${id} .equil-position-manage__pending {
    position: absolute;
    top: 135px;
  }

  #${id} .equil-scatter-auth {
    display: flex;
  }

  #${id} .scatter-auth-button {
    height: 30px;
    min-width: 50px;
    border: 0;
    font-size: 16px;
    color: #333;
    background: #ccc;
  }

  #${id} .equil-position-manage__form {
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    min-height: 129px;
  }

  #${id} .equil-position-manage__input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 61px;
  }

  #${id} .equil-position-manage__input-label {
    font-family: ${theme.text.boldFont};
    font-size: 12px;
    line-height: 15px;
    color: ${theme.text.color};
  }

  #${id} .equil-position-manage__form--tab .equil-position-manage__input-wrapper {
    min-height: 40px;
  }

  #${id} .equil-position-manage__input {
    border: 1px solid #0024461a;
    height: 40px;
    padding-left: 12px;
    width: 100%;
    outline: none;
    font-family: ${theme.text.boldFont};
    font-size: 14px;
    line-height: 18px;
    color: ${theme.text.color};
  }

  #${id} input::-webkit-outer-spin-button,
  #${id} input::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
}

  #${id} input[type=number] {
    -moz-appearance:textfield;
}


  #${id} .equil-position-manage__input--error {
    border-color: red;
  }

  #${id} .equil-position-manage__button {
    max-width: 320px;
    width: 100%;
    height: 40px;

    border-radius: 4px;
    border: none;

    color: ${theme.button.textColor};
    cursor: pointer;
    font-size: 14px;
    line-height: 18px;
    font-family: ${theme.button.font};
    background: ${theme.button.background};
  }

  #${id} .equil-position-manage__notification {
    position: absolute;
    top: 50px;
    min-height: 70px;
    width: 270px;
    border-radius: 4px;
    background: white;
    border: 1px solid #1792FF;
    padding: 15px;
    padding-right: 5px;
    color: #1792FF;
  }

  #${id} .equil-position-manage__notification div:first-child {
    font-family: Geometria-Bold;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }

  #${id} .equil-position-manage__notification div:last-child {
    font-size: 12px;
    line-height: 15px;
  }


  #${id} .equil-position-manage__parametersTitle {
    font-size: 1.425em;
  }

  #${id} .equil-position-manage__tabs,
  #${id} .equil-position-manage__title,
  #${id} .equil-rates__values,
  #${id} .equil-position-manage__input {
    font-size: 1em;
  }

  #${id} .equil-position-actions__label,
  #${id} .equil-position-parameters__value,
  #${id} .equil-position-actions__value,
  #${id} .equil-position-parameters__title,
  #${id} .equil-user-balances__USDvalue,
  #${id} .equil-position-manage__pending {
    font-size: 0.8575em;
  }


  ${mobile !== "never" ? `${
    mobile !== "always"
      ? `@media only screen and (max-width: 767px) {`
      : ""}

    #${id} .equil-position-manage__button {
      margin-left: auto;
      margin-right: auto;
    }

    #${id} .equil-position-manage__parametersTitle {
      font-size: 20px;
      margin-bottom: 20px;
    }

    #${id} .equil-position-manage__tabs,
    #${id} .equil-position-manage__title,
    #${id} .equil-rates__values,
    #${id} .equil-position-manage__input {
      font-size: 14px;
    }

    #${id} .equil-position-actions__label,
    #${id} .equil-position-parameters__value,
    #${id} .equil-position-actions__value,
    #${id} .equil-position-parameters__title,
    #${id} .equil-user-balances__USDvalue,
    #${id} .equil-position-manage__pending {
      font-size: 12px;
    }

    #${id} .equil-position-manage__tabs {
      font-size: 16px;
      max-width: 320px;
    }

    #${id} .equil-position-manage__balanceAndPrice {
      display: none;
    }

    #${id} .equil-position-manage {
      padding: 0;
      padding-top: 55px;
    }

    #${id} .equil-position-manage__wrapper {
      min-width: 100%;
      border: unset;
      flex-direction: column-reverse;
      padding: 0;
    }

    #${id} .equil-position-actions {
      margin-right: 0px;
      margin-left: auto;
      margin-right: auto;
      padding: 20px;
      padding-top: 53px;
      padding-bottom: 40px;
      width: 100%;
      max-width: 767px;
      position: relative;
    }

    #${id} .equil-position-parameters {
      flex: 1 0 auto;
      max-width: 767px;
      margin-right: auto;
      margin-left: auto;
      width: 100%;
     min-height: 190px;
    }

    #${id} .equil-position-manage__title {
      top: 18px;
      left: 20px;
    }

    #${id} .equil-position-manage__header {
      padding-left: 20px;
      padding-right: 20px;
    }

    #${id} .equil-position-manage__form {
      min-height: 200px;
    }

    #${id} .equil-position-manage__form--tab {
      min-height: 97px;
    }

    #${id} .equil-position-manage__error {
      width: 100%;
    }

    #${id} .equil-position-manage__tab {
      font-size: 14px;
      margin-right: 8px;
    }

    #${id} .equil-position-manage__telegram {
      display: none;
    }
${
    mobile !== "always"
      ? `
    }
`
      : ""
    }
  `
    : ""
  }
`;

const styleElements: { [id: string]: HTMLElement } = {};

export const setStyles = (
  el: HTMLElement,
  theme: Theme = {
    title: {
      color: "#333",
      font: "'Geometria-Heavy', serif",
    },
    text: {
      color: "#002446",
      font: "'Geometria', serif",
      boldFont: "'Geometria-Bold', serif",
    },
    button: {
      textColor: "#ffffff",
      font: "'Geometria-Bold', serif",
      background: "#1792ff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#ecf6ff",
    },
    header: {
      color: "#1792ff",
    },
  },
  options: {
    baseUrl?: string;
    mobile?: string /* "responsive" | "always" | "never "*/;
  } = {},
) => {
  const opts = { baseUrl: "", mobile: "responsive", ...options };
  let id = el.id;

  if (!id) {
    el.id = id = `widget-${autoIncrement()}`;
  }

  if (styleElements[id]) {
    window.document.body.removeChild(styleElements[id]);
  }

  const widgetElem: HTMLElement | null = window.document.querySelector(`#${id}`);

  const widgetWidth = widgetElem ? widgetElem!.offsetWidth : 810; // default width
  let baseFont = "14px";

  if (widgetWidth < 810) {
    const proc = (100 - widgetWidth * 100 / 810).toFixed(2).toString() + "%";
    baseFont = `calc(14px - ${proc})`;
  }

  if (widgetWidth < 600) {
    opts.mobile = "always";
  }

  styleElements[id] = window.document.createElement("style");

  styleElements[id].appendChild(
    window.document.createTextNode(
      styles(id, theme, opts.baseUrl, opts.mobile, baseFont),
    ),
  );

  window.document.body.appendChild(styleElements[id]);
};
