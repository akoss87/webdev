var counter = 0;

function updateDisplay() { document.getElementById("counter").innerText = counter; }

document.getElementById("btn1").onclick = function () {
    counter++;
    updateDisplay();
}

updateDisplay();
