function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b
}

function checkAndCalculate() {
    switch (operator) {
        case "+":
            firstNum = String(Math.floor(operate(+firstNum, +secondNum, add)*1000000)/1000000);
            break;
        case "-":
            firstNum = String(Math.floor(operate(+firstNum, +secondNum, subtract)*1000000)/1000000);
            break;
        case "x":
            firstNum = String(Math.floor(operate(+firstNum, +secondNum, multiply)*1000000)/1000000);
            break;
        case "/":
            if (+secondNum === 0) {
                alert("Dividing to 0 is impossible")
                reset()
                break;
            }
            firstNum = String(Math.floor(operate(+firstNum, +secondNum, divide)*1000000)/1000000);
            break;
        default:
            console.log("problem");
            break;
    }
    currentNum = "first"
    secondNum = ""
    operator = ""
}
const screen = document.querySelector(".result")
const screenOperator = document.querySelector(".operator")
const screenFirstNum = document.querySelector(".first-number")
const screenSecondNum = document.querySelector(".second-number")
let firstNum = ""
let secondNum = ""
let currentNum = "first"
let operator = "";

function updateScreen() {
    screenOperator.textContent = operator;
    screenFirstNum.textContent = firstNum;
    screenSecondNum.textContent = secondNum;
}


function operate(num1, num2, operation) {
    return operation(num1, num2);
}

document.querySelectorAll(".operator").forEach((opr) => {
    opr.addEventListener("click", (e) => {
        if (firstNum&&firstNum!=".") {
            if (operator && secondNum && secondNum!=".") {
                checkAndCalculate();
                operator = e.target.textContent;
            }
            operator = e.target.textContent;
            currentNum = "second"
            updateScreen();
        }
    })
})


function getNumber(e, current) {
    firstNum = String(firstNum);
    secondNum = String(secondNum);
    if (current == "first") {
        if (firstNum.includes(".") && e.target.textContent == ".") {
            return
        }
        firstNum += e.target.textContent
    } else {
        if (secondNum.includes(".") && e.target.textContent == ".") {
            return
        }
        secondNum += e.target.textContent
    }
    updateScreen()
}



document.querySelectorAll(".number").forEach(numBtn => {
    numBtn.addEventListener("click", (e) => {
        getNumber(e, currentNum);
    })
})



document.querySelector(".calculate").addEventListener("click", () => {
    if (firstNum && secondNum && operator &&secondNum!==".") {
        checkAndCalculate()
        updateScreen();
    }
})


document.querySelector(".delete-char").addEventListener("click", () => {
    if (currentNum == "first" && operator.length !== 1) {
        firstNum = firstNum.slice(0, firstNum.length - 1)
    } else if (currentNum == "second" && secondNum.length > 1) {
        secondNum = secondNum.slice(0, secondNum.length - 1)
    } else {
        currentNum = "first"
        operator = "";
    }
    updateScreen()
})

function reset() {
    firstNum = "";
    secondNum = "";
    operator = "";
    updateScreen()
    currentNum = "first"
}


document.querySelector(".clear").addEventListener("click", () => {
    reset();
})