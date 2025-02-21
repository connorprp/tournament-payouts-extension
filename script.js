alert("JS Loaded");

const text = document.getElementById("text");
const button = document.getElementById("btn");
const input = document.getElementById("text");

button.addEventListener("click", updateText);

function updateText() {
    const newText = input.value;
    text.innerText = newText;
}
