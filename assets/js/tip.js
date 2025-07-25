// DOM Elements
const hesapTutari = document.querySelector(".bill");
const bahsisButonlari = document.querySelectorAll(".select_tip");
const toplamSonuc = document.querySelector(".total");
const hesapSifirlama = document.querySelector(".reset");
const kacKisi = document.querySelector(".people");
const kisiBasiBahsis = document.querySelector(".tip_amount");
const ozelBahsis = document.querySelector(".custom_tip");
const kisiHatasi = document.querySelector(".people_error");

// Global variables
let aktifBahsisOrani = 0;
let hesapMiktari = 0;
let kisiSayisi = 0;

// Utility Functions
function formatCurrency(amount) {
  return "$" + (isNaN(amount) ? "0.00" : amount.toFixed(2));
}

function validateInputs() {
  let isValid = true;

  // People validation
  if (kacKisi.value === "" || kacKisi.value === "0" || kacKisi.value < 1) {
    kacKisi.classList.add("error");
    kisiHatasi.textContent = "Can't be zero";
    kisiHatasi.style.display = "block";
    isValid = false;
  } else {
    kacKisi.classList.remove("error");
    kisiHatasi.textContent = "";
    kisiHatasi.style.display = "none";
  }

  // Bill validation
  if (hesapTutari.value === "" || hesapTutari.value === "0") {
    hesapTutari.classList.add("error");
    isValid = false;
  } else {
    hesapTutari.classList.remove("error");
  }

  return isValid;
}

function calculateTip() {
  hesapMiktari = parseFloat(hesapTutari.value) || 0;
  kisiSayisi = parseInt(kacKisi.value) || 0;

  if (!validateInputs() || aktifBahsisOrani === 0) {
    return;
  }

  const bahsisTutari = (hesapMiktari * aktifBahsisOrani) / 100;
  const toplamTutar = hesapMiktari + bahsisTutari;
  const kisiBasiToplam = toplamTutar / kisiSayisi;
  const kisiBasiBahsisTutari = bahsisTutari / kisiSayisi;

  toplamSonuc.textContent = formatCurrency(kisiBasiToplam);
  kisiBasiBahsis.textContent = formatCurrency(kisiBasiBahsisTutari);

  // Enable reset button
  hesapSifirlama.classList.add("active");
}

function resetActiveStates() {
  bahsisButonlari.forEach((btn) => btn.classList.remove("active"));
  ozelBahsis.value = "";
}

// Event Handlers
function handleTipClick(event) {
  resetActiveStates();
  event.target.classList.add("active");
  aktifBahsisOrani = parseInt(event.target.textContent);
  calculateTip();
}

function handleCustomTipInput(event) {
  resetActiveStates();
  aktifBahsisOrani = parseFloat(event.target.value) || 0;
  calculateTip();
}

function handleBillInput() {
  calculateTip();
}

function handlePeopleInput() {
  calculateTip();
}

function handleResetClick() {
  // Reset all values
  hesapTutari.value = "";
  kacKisi.value = "";
  ozelBahsis.value = "";
  toplamSonuc.textContent = "$0.00";
  kisiBasiBahsis.textContent = "$0.00";

  // Reset global variables
  aktifBahsisOrani = 0;
  hesapMiktari = 0;
  kisiSayisi = 0;

  // Remove active states
  resetActiveStates();
  hesapSifirlama.classList.remove("active");

  // Remove error states
  hesapTutari.classList.remove("error");
  kacKisi.classList.remove("error");
  kisiHatasi.textContent = "";
  kisiHatasi.style.display = "none";
}

// Event Listeners
bahsisButonlari.forEach((button) => {
  button.addEventListener("click", handleTipClick);
});

ozelBahsis.addEventListener("input", handleCustomTipInput);
hesapTutari.addEventListener("input", handleBillInput);
kacKisi.addEventListener("input", handlePeopleInput);
hesapSifirlama.addEventListener("click", handleResetClick);

// Input restrictions
hesapTutari.addEventListener("keypress", function (e) {
  // Allow: backspace, delete, tab, escape, enter
  if (
    [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    (e.keyCode === 65 && e.ctrlKey === true) ||
    (e.keyCode === 67 && e.ctrlKey === true) ||
    (e.keyCode === 86 && e.ctrlKey === true) ||
    (e.keyCode === 88 && e.ctrlKey === true) ||
    // Allow: decimal point
    (e.keyCode === 190 && this.value.indexOf(".") === -1)
  ) {
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
});

kacKisi.addEventListener("keypress", function (e) {
  // Only allow numbers for people count
  if (
    [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
    (e.keyCode === 65 && e.ctrlKey === true) ||
    (e.keyCode === 67 && e.ctrlKey === true) ||
    (e.keyCode === 86 && e.ctrlKey === true) ||
    (e.keyCode === 88 && e.ctrlKey === true)
  ) {
    return;
  }
  if (
    e.shiftKey ||
    ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105))
  ) {
    e.preventDefault();
  }
});

ozelBahsis.addEventListener("keypress", function (e) {
  // Allow decimal for custom tip
  if (
    [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
    (e.keyCode === 65 && e.ctrlKey === true) ||
    (e.keyCode === 67 && e.ctrlKey === true) ||
    (e.keyCode === 86 && e.ctrlKey === true) ||
    (e.keyCode === 88 && e.ctrlKey === true) ||
    (e.keyCode === 190 && this.value.indexOf(".") === -1)
  ) {
    return;
  }
  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Set initial state
  toplamSonuc.textContent = "$0.00";
  kisiBasiBahsis.textContent = "$0.00";
  kisiHatasi.style.display = "none";
});
