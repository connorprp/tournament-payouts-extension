/*alert("JS Loaded");*/

const text = document.getElementById("text");
const button = document.getElementById("btn");
const input = document.getElementById("input");

button.addEventListener("click", updateText);

function updateText() {
    text.textContent = input.value;
}
