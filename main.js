let currencyRatio = {
  USD: {
    KRW: 1376,
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
    JPY: 0.11517,
    CNY: 0.00533,
    EUR: 0.00068,
    AUD: 0.0011,
    NZD: 0.00119,
    unit: "원",
  },
  CNY: {
    KRW: 189.36,
    USD: 0.13759,
    JPY: 21.60165,
    CNY: 1,
    EUR: 0.12792,
    AUD: 0.20771,
    NZD: 0.22476,
    unit: "위안",
  },
  JPY: {
    KRW: 8.68388,
    USD: 0.00637,
    JPY: 1,
    CNY: 0.04625,
    EUR: 0.00592,
    AUD: 0.00962,
    NZD: 0.01039,
    unit: "엔",
  },
  EUR: {
    KRW: 1464.301,
    USD: 1.07527,
    JPY: 168.7634,
    CNY: 7.8172,
    EUR: 1,
    AUD: 1.62365,
    NZD: 1.75268,
    unit: "유로",
  },
  AUD: {
    KRW: 902.51656,
    USD: 0.66225,
    JPY: 103.27815,
    CNY: 4.81457,
    EUR: 0.61579,
    AUD: 1,
    NZD: 1.07947,
    unit: "달러",
  },
  NZD: {
    KRW: 836.68712,
    USD: 0.6135,
    JPY: 96.32331,
    CNY: 4.45951,
    EUR: 0.57055,
    AUD: 0.92642,
    NZD: 1,
    unit: "달러",
  },
};

let fromCurrency = "USD";
let toCurrency = "KRW";

document.addEventListener("DOMContentLoaded", () => {
  updateInitialValues();
});

function updateInitialValues() {
  const fromAmount = 1;
  const fromCurrency = "USD";
  const toCurrency = "KRW";

  document.getElementById("from_input").value = fromAmount;
  document.getElementById("fromRecite").textContent = `${convertToKoreanUnits(
    fromAmount
  )} 달러`;
  document.getElementById("fromCurrencyCode").textContent = fromCurrency;

  const toAmount = (
    fromAmount * currencyRatio[fromCurrency][toCurrency]
  ).toFixed(2);
  document.getElementById("to_input").value = toAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("toRecite").textContent = `${convertToKoreanUnits(
    toAmount
  )} 원`;
  document.getElementById("toCurrencyCode").textContent = toCurrency;

  document.getElementById("fromCurrency").value = fromCurrency;
  document.getElementById("toCurrency").value = toCurrency;
}

function updateCurrencyCode(type) {
  let selectElement, spanElement;

  if (type === "from") {
    selectElement = document.getElementById("fromCurrency");
    spanElement = document.getElementById("fromCurrencyCode");
  } else {
    selectElement = document.getElementById("toCurrency");
    spanElement = document.getElementById("toCurrencyCode");
  }

  const selectedCurrency = selectElement.value;
  spanElement.textContent = selectedCurrency;
  updateReciteText();
}

function updateReciteText() {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const fromAmount =
    parseFloat(document.getElementById("from_input").value.replace(/,/g, "")) ||
    0;

  const fromUnit = currencyRatio[fromCurrency].unit;
  const toUnit = currencyRatio[toCurrency].unit;

  document.getElementById("fromRecite").textContent = `${convertToKoreanUnits(
    fromAmount
  )} ${fromUnit}`;

  const toAmount = (
    fromAmount * currencyRatio[fromCurrency][toCurrency]
  ).toFixed(2);
  document.getElementById("to_input").value = toAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("toRecite").textContent = `${convertToKoreanUnits(
    toAmount
  )} ${toUnit}`;
}

function validateAndFormatInput(inputElement) {
  let value = inputElement.value.replace(/,/g, "");
  value = value.replace(/[^0-9.]/g, "");

  if (value.startsWith("0")) {
    if (value.indexOf(".") > 1) {
      value = value.replace(/^0+/, "0");
    } else {
      value = value.replace(/^0+/, "");
    }
  }

  if (value === "") {
    value = "0";
  }

  if (value.split(".").length > 2) {
    value = value.replace(/\.+$/, "");
  }

  inputElement.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  updateReciteText();
}

function convertToKoreanUnits(number) {
  number = parseFloat(number);
  if (number < 10000) {
    return number.toLocaleString();
  }

  const units = ["", "만", "억", "조"];
  let result = "";
  let unitIndex = 0;

  while (number > 0) {
    const chunk = number % 10000;
    if (chunk > 0) {
      result = `${chunk.toLocaleString()}${units[unitIndex]} ${result}`.trim();
    }
    number = Math.floor(number / 10000);
    unitIndex++;
  }

  return result.trim();
}
