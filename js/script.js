"use strict";

const billInputEl = document.getElementById("bill-inp");
const peopleInputEl = document.getElementById("people-inp");
const tipOutputEl = document.getElementById("tip-amount");
const totalOutputEl = document.getElementById("total");
const resetBtnEl = document.getElementById("reset-btn");
const submitBtnEl = document.getElementById("submit-btn");
const selectItems = document.querySelectorAll(".select-item");
const selectBox = document.querySelector(".select-container");

const validation = function () {
  if (!billInputEl.value) {
    billInputEl.parentElement.classList.remove("valid-input");
    billInputEl.parentElement.classList.add("invalid-input");
  } else {
    billInputEl.parentElement.classList.remove("invalid-input");
    billInputEl.parentElement.classList.add("valid-input");
  }

  if (!peopleInputEl.value) {
    peopleInputEl.parentElement.classList.remove("valid-input");
    peopleInputEl.parentElement.classList.add("invalid-input");
  } else {
    peopleInputEl.parentElement.classList.remove("invalid-input");
    peopleInputEl.parentElement.classList.add("valid-input");
  }

  if (!document.querySelector(".selected-item")) {
    selectBox.classList.add("invalid-select");
  } else {
    selectBox.classList.remove("invalid-select");
  }
};

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    for (let y = 0; y < selectItems.length; y++) {
      selectItems[y].classList.remove("selected-item");
    }
    this.classList.add("selected-item");
  });
}

submitBtnEl.addEventListener("click", function () {
  validation();
  const bill = Number(billInputEl.value);
  const people = Number(peopleInputEl.value);
  const tipPercent =
    document.querySelector(".selected-item").textContent ||
    document.querySelector(".selected-item").value;

  let tip = "";
  for (let x = 0; x < tipPercent.length - 1; x++) {
    if (!tipPercent.includes("%")) {
      if (tipPercent.length <= 2) {
        tip = "0." + tipPercent;
      } else {
        const tempTip = [...tipPercent];
        tip = `${tempTip[0]}.${tempTip[1]}${tempTip[2]}`;
      }
      break;
    }
    if (x === 0) {
      if (tipPercent.length === 3) {
        tip += "0.";
      } else if (tipPercent.length === 2) {
        tip += "0.0";
      }
      tip += tipPercent[x];
    }
  }

  const billCalc = bill / people;
  const tipCalc = billCalc * Number(tip);
  const totalCalc = tipCalc + billCalc;
  tipOutputEl.textContent = "$" + tipCalc.toFixed(2);
  totalOutputEl.textContent = "$" + totalCalc.toFixed(2);
});

resetBtnEl.addEventListener("click", function () {
  billInputEl.parentElement.classList.remove("invalid-input", "valid-input");
  peopleInputEl.parentElement.classList.remove("invalid-input", "valid-input");
  selectBox.classList.remove("invalid-select");
  billInputEl.value = "";
  peopleInputEl.value = "";
  tipOutputEl.textContent = "$0.00";
  totalOutputEl.textContent = "$0.00";
  for (let y = 0; y < selectItems.length; y++) {
    selectItems[y].classList.remove("selected-item");
    if (y === selectItems.length - 1) {
      selectItems[y].value = "";
    }
  }
});
