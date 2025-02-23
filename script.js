const numPlacesInput = document.getElementById('numPlaces');
const potAmountInput = document.getElementById('potAmount');
const submit = document.getElementById('submitPot');
const result = document.getElementById('result');
const table = document.getElementById('table');
const clearBtn = document.getElementById('clear');

document.addEventListener("DOMContentLoaded", () => { updateNumAllocs(numPlacesInput.value); });
numPlacesInput.addEventListener('change', () => { updateNumAllocs(numPlacesInput.value) });
submit.addEventListener("click", () => { getInput(); });
clearBtn.addEventListener("click", () => {
    table.innerHTML = "";
    result.setAttribute('hidden', 'true');
    table.setAttribute('hidden', 'true');
    numPlacesInput.value = 1;
    potAmountInput.value = "";
    updateNumAllocs(1);

});

function updateNumAllocs(value) {
    const oldInputs = document.querySelectorAll('input[id^="place"]');
    oldInputs.forEach(input => input.remove());

    for (let i = 0; i < value; i++) {
        let postfix = "";
        switch (i) {
            case 0: postfix = "st"; break;
            case 1: postfix = "nd"; break;
            case 2: postfix = "rd"; break;
            default: postfix = "th"; break;
        }
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'number');
        newInput.setAttribute('id', `place${i}`);
        newInput.setAttribute('placeholder', `${i + 1}${postfix} Place`);
        newInput.setAttribute('style', 'display: block; margin-bottom: 10px; margin-left: auto; margin-right: auto;');
        newInput.setAttribute('required', '');
        document.body.appendChild(newInput);
    }
}

const getInput = () => {
    const inputs = document.querySelectorAll('input[id^="place"]');
    const values = [];
    inputs.forEach(inputs => values.push(inputs.value));
    if (potAmountInput.value === "") {
        alert("Please enter the total pot amount")
    } else if (sumArray(values) !== 100) {
        alert("Please ensure the percent allocations total 100%");
    } else {
        calculatePayouts(values);
    }
}

const sumArray = (array) => {
    let sum = 0;
    array.forEach(el => sum += parseInt(el));
    return sum;
}

const calculatePayouts = (array) => {
    let percentArray = array;
    let intArray = [];
    let approximate = []
    let final = [];
    let extra = [];
    array.forEach(el => intArray.push(parseFloat(el)));
    for (let i = 0; i < intArray.length; i++) {
        approximate.push((potAmountInput.value / 100) * intArray[i]);
    }
    approximate.forEach(el => {
        final.push(el - (el - Math.floor(el)));
        extra.push(el - Math.floor(el));
    });
    console.log(sumArray(extra))
    updateResult(intArray, final, extra);
}

const updateResult = (intArray, final, extra) => {
    table.innerHTML = "";
    const headerRow = document.createElement('tr');
    const placeHeader = document.createElement('th');
    placeHeader.textContent = 'Place';
    const percentHeader = document.createElement('th');
    percentHeader.textContent = 'Percent';
    const payoutHeader = document.createElement('th');
    payoutHeader.textContent = 'Payout';

    headerRow.appendChild(placeHeader);
    headerRow.appendChild(percentHeader);
    headerRow.appendChild(payoutHeader);
    table.appendChild(headerRow);

    for (let i = 0; i < intArray.length; i++) {
        const row = document.createElement('tr');

        const placeCell = document.createElement('td');
        placeCell.textContent = `${i + 1}`;
        row.appendChild(placeCell);

        const percentCell = document.createElement('td');
        percentCell.textContent = `${intArray[i]}%`;
        row.appendChild(percentCell);

        const payoutCell = document.createElement('td');
        payoutCell.textContent = `$${final[i].toFixed(2)}`;
        row.appendChild(payoutCell);

        table.appendChild(row);
    }
    result.removeAttribute('hidden');
    table.removeAttribute('hidden');
    console.log(sumArray(extra));
    result.innerHTML = `Payout total: $${parseFloat(potAmountInput.value).toFixed(2)} <br> Left Over: $${(potAmountInput.value - sumArray(final)).toFixed(2)}`;
}