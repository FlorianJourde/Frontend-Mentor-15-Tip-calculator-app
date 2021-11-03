let bill = document.getElementById('bill');
let peopleNumber = document.getElementById('people-number');
let billValue = 0;
let peopleNumberValue = 0;
let tippedValue = 0;
let totalResult = document.getElementById('total-result');
let tipAmountResult = document.getElementById('tip-amount-result');
let selectTip5 = document.getElementById('select-tip-5');
let selectTip10 = document.getElementById('select-tip-10');
let selectTip15 = document.getElementById('select-tip-15');
let selectTip25 = document.getElementById('select-tip-25');
let selectTip50 = document.getElementById('select-tip-50');
let selectTipCustom = document.getElementById('select-tip-custom');
let tips = [selectTip5, selectTip10, selectTip15, selectTip25, selectTip50];

bill.addEventListener('keyup', updateBill);
peopleNumber.addEventListener('keyup', updatePeople);

selectTipCustom.addEventListener('keyup', function () {
  if (Number.isInteger(parseFloat(this.value)) && parseFloat(this.value) !== 0) {
    tips.forEach(function(tip) {
      tip.classList.remove('selected');
    });
    tippedValue = parseFloat(billValue) + ((parseFloat(billValue) / 100) * parseFloat(this.value));
    selectTipCustom.classList.remove('error');
    selectTipCustom.classList.add('valid');
    if (peopleNumberValue !== 0) {
      tipAmountResult.textContent = ((tippedValue - billValue) / peopleNumberValue).toFixed(2);
      totalResult.textContent = (tippedValue / peopleNumberValue).toFixed(2);
    } else {
      tipAmountResult.textContent = (tippedValue - billValue).toFixed(2);
      totalResult.textContent = (tippedValue).toFixed(2);
    }
  } else {
    selectTipCustom.classList.remove('valid');
    selectTipCustom.classList.add('error');
  }
});

for (let i = 0; i < tips.length; i++) {
  tips[i].addEventListener('click', function() {
    switchSelected(tips, this);
    selectTipCustom.classList.remove('error');
    selectTipCustom.classList.remove('valid');
    tippedValue = parseFloat(billValue) + ((parseFloat(billValue) / 100) * parseFloat(tips[i].value));
    if (peopleNumberValue !== 0) {
      tipAmountResult.textContent = ((tippedValue - billValue) / peopleNumberValue).toFixed(2);
      totalResult.textContent = (tippedValue / peopleNumberValue).toFixed(2);
    } else {
      tipAmountResult.textContent = (tippedValue - billValue).toFixed(2);
      totalResult.textContent = (tippedValue).toFixed(2);
    }
  });
}

function switchSelected(tip, selected) {
  tips.forEach(function(tip) {
    tip.classList.remove('selected');
  });
  selected.classList.add('selected');
}

function updateBill(e) {
  if (Number.isInteger(parseFloat(e.target.value)) && parseFloat(this.value) !== 0) {
    bill.classList.remove('error');
    bill.classList.add('valid');
    billValue = parseFloat(e.target.value);
    totalResult.textContent = billValue;
  } else {
    bill.classList.remove('valid');
    bill.classList.add('error');
  }
}

function updatePeople(e) {
  if (Number.isInteger(parseFloat(this.value)) && parseFloat(this.value) !== 0) {
    peopleNumberValue = this.value
    splittedValue = parseFloat(billValue / this.value);
    peopleNumber.classList.remove('error');
    peopleNumber.classList.add('valid');
    if (tippedValue !== 0) {
      tipAmountResult.textContent = ((tippedValue - billValue) / this.value).toFixed(2);
      totalResult.textContent = ((tippedValue) / this.value).toFixed(2);
    } else {
      tipAmountResult.textContent = tippedValue.toFixed(2);
      totalResult.textContent = (billValue / peopleNumberValue).toFixed(2);
    }
  } else {
    peopleNumber.classList.remove('valid');
    peopleNumber.classList.add('error');
  }
}