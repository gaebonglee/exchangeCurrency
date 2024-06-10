let currencyRatio = {
  USD: {
    KRW: 1362.7,
    USD: 1,
    JPY: 156.95,
    CNY: 7.27,
    EUR: 0.93,
    AUD: 1.51,
    NZD: 1.63,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00073,
    JPY: 0.114,
    CNY: 0.00528,
    EUR: 0.00068,
    AUD: 0.00073,
    NZD: 0.00063,
    unit: "원",
  },
  CNY: {
    KRW: 189.36,
    USD: 0.14,
    JPY: 21.6,
    CNY: 1,
    EUR: 0.13,
    AUD: 0.21,
    NZD: 0.22,
    unit: "위안",
  },
  JPY: {
    KRW: 8.767,
    USD: 0.00637,
    JPY: 1,
    CNY: 0.0463,
    EUR: 0.00593,
    AUD: 0.00964,
    NZD: 0.0104,
    unit: "엔",
  },
  EUR: {
    KRW: 1478,
    USD: 1.074,
    JPY: 168.66,
    CNY: 7.809,
    EUR: 1,
    AUD: 1.626,
    NZD: 1.755,
    unit: "유로",
  },
  AUD: {
    KRW: 909,
    USD: 0.66,
    JPY: 103.709,
    CNY: 4.801,
    EUR: 0.614,
    AUD: 1,
    NZD: 1.079,
    unit: "달러",
  },
  NZD: {
    KRW: 842,
    USD: 0.612,
    JPY: 96.09,
    CNY: 4.448,
    EUR: 0.569,
    AUD: 0.926,
    NZD: 1,
    unit: "달러",
  },
};

let fromCurrency = "USD";
let toCurrency = "KRW";

document.getElementById("fromCurrency").addEventListener("change", function () {
  updateCurrencyCode("from");
});

document.getElementById("toCurrency").addEventListener("change", function () {
  updateCurrencyCode("to");
});

function updateCurrencyCode(type) {
  const currencySelect = document.getElementById(type + "Currency");
  const selectedOption = currencySelect.options[currencySelect.selectedIndex];
  const currencyCodeSpan = document.getElementById(type + "CurrencyCode");

  const currencyCode = selectedOption.value;

  currencyCodeSpan.textContent = currencyCode;

  if (type === "from") {
    fromCurrency = currencyCode;
    convert();
  } else {
    toCurrency = currencyCode;
    convert();
  }
}

function truncateToTwoDecimals(value) {
  return Math.floor(value * 100) / 100;
}

function formatNumber(value) {
  return value.toLocaleString();
}

function convert() {
  let amount = parseFloat(
    document.getElementById("from_input").value.replace(/,/g, "")
  );
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
  convertedAmount = truncateToTwoDecimals(convertedAmount);

  document.getElementById("to_input").value = formatNumber(convertedAmount);
  document.getElementById("fromRecite").textContent = `${formatNumber(
    amount
  )} ${currencyRatio[fromCurrency].unit}`;
  document.getElementById("toRecite").textContent = `${formatNumber(
    convertedAmount
  )} ${currencyRatio[toCurrency].unit}`;
}

function validateAndFormatInput(input) {
  let value = input.value.replace(/,/g, "");
  if (/^\d*\.?\d*$/.test(value)) {
    input.value = formatNumber(value);
    convert();
  } else {
    input.value = input.value.slice(0, -1);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("from_input").value = 1;
  document.getElementById("to_input").value = formatNumber(
    currencyRatio[fromCurrency][toCurrency]
  );
  document.getElementById("fromCurrency").value = fromCurrency;
  document.getElementById("toCurrency").value = toCurrency;
  document.getElementById(
    "fromRecite"
  ).textContent = `1 ${currencyRatio[fromCurrency].unit}`;
  document.getElementById("toRecite").textContent = `${formatNumber(
    currencyRatio[fromCurrency][toCurrency]
  )} ${currencyRatio[toCurrency].unit}`;
  updateCurrencyCode("from");
  updateCurrencyCode("to");
});
