let currencyRatio = {
  USD: {
    KRW: 1362.7,
    USD: 1,
    VND: 25467.5,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00073,
    VND: 18.69,
    unit: "원",
  },
  VND: {
    KRW: 0.054,
    USD: 0.000039,
    VND: 1,
    unit: "동",
  },
};

let fromCurrency = "USD";
let toCurrency = "KRW";

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    const country = this.getAttribute("data-country");
    const currency = this.getAttribute("data-currency");
    document.getElementById(
      "from_btn"
    ).innerHTML = `<span class="country-name">${country}</span> <span class="currency-code">${currency}</span><i class="ri-arrow-down-s-line"></i>`;
    fromCurrency = currency;
    console.log("fromCurrency 는", fromCurrency);
    convert();
    document.querySelector("#from_input").nextElementSibling.textContent =
      currencyRatio[fromCurrency].unit;
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    const country = this.getAttribute("data-country");
    const currency = this.getAttribute("data-currency");
    document.getElementById(
      "to_btn"
    ).innerHTML = `<span class="country-name">${country}</span> <span class="currency-code">${currency}</span><i class="ri-arrow-down-s-line"></i>`;
    toCurrency = currency;
    console.log("toCurrency 는", toCurrency);
    convert();
    document.querySelector("#to_input").nextElementSibling.textContent =
      currencyRatio[toCurrency].unit;
  })
);

function truncateToTwoDecimals(value) {
  return Math.floor(value * 100) / 100;
}

function convert() {
  let amount = document.getElementById("from_input").value;
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
  convertedAmount = truncateToTwoDecimals(convertedAmount);
  console.log("환전결과!", convertedAmount);

  document.getElementById("to_input").value = convertedAmount;
  document.querySelector("#to_input").nextElementSibling.textContent =
    currencyRatio[toCurrency].unit;
}

function toConvert() {
  let amount = document.getElementById("to_input").value;
  let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
  convertedAmount = truncateToTwoDecimals(convertedAmount);
  console.log("역환전결과!", convertedAmount);

  document.getElementById("from_input").value = convertedAmount;
  document.querySelector("#from_input").nextElementSibling.textContent =
    currencyRatio[fromCurrency].unit;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#from_input").nextElementSibling.textContent =
    currencyRatio[fromCurrency].unit;
  document.querySelector("#to_input").nextElementSibling.textContent =
    currencyRatio[toCurrency].unit;
  document.getElementById("to_input").addEventListener("keyup", toConvert);
});
