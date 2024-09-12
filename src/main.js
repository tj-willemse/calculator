import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/calculator.css';
import '../styles/util.css';

// get elements
const display = document.getElementById('display');
const operators = document.querySelectorAll('.operators');
const numberBtn = document.querySelectorAll('.num');
const deleteBtn = document.getElementById('delete');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const icon = document.getElementById('icon');

// create elements
let number1 = '';
let number2 = '';
let operator = '';
let isOperatorSelected = false;
let lastResult = '';

// functions
function inputNum(e) {
  const numValue = e.target.textContent;
  if (isOperatorSelected) {
    number2 += numValue;
    display.value = number2;
  } else {
    number1 += numValue;
    display.value = number1;
  }
}
function inputOperator(e) {
  if (number1 === '' && lastResult !== '') {
    number1 = lastResult;
  }
  if (number1 === '') return;

  if (isOperatorSelected) {
    calculate();
  }

  operator = e.target.textContent;
  isOperatorSelected = true;
}

function operate(number1, operator, number2) {
  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);

  switch (operator) {
    case '+':
      return num1 + num2;
      break;
    case '-':
      return num1 - num2;
      break;
    case '/':
      return num1 / num2;
      break;
    case '×':
      return num1 * num2;

    default:
      console.error('Unsupported operator');
      return null;
  }
}

function calculate() {
  if (number1 === '' || number2 === '' || operator === '') return;
  const result = operate(number1, operator, number2);
  if (result !== null) {
    display.value = result;

    lastResult = result.toString();
    number1 = lastResult;
    number2 = '';
    operator = '';
    isOperatorSelected = false;
  }
}

function clearDisplay() {
  display.value = '';
  number1 = '';
  number2 = '';
  operator = '';
  isOperatorSelected = '';
  lastResult = '';
}

function deleteNum() {
  if (isOperatorSelected) {
    number2 = number2.slice(0, -1);
    display.value = number2;
  } else {
    number1 = number1.slice(0, -1);
    display.value = number1;
  }
}
function lightDark() {
  document.body.classList.toggle('dark-mode');
}

// loops

// event listeners
numberBtn.forEach((buttons) => {
  buttons.addEventListener('click', inputNum);
});
operators.forEach((operators) => {
  operators.addEventListener('click', inputOperator);
});
equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteNum);
icon.addEventListener('click', lightDark);
