'use strict';

class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.previousOperandText = previousOperandText;
		this.currentOperandText = currentOperandText;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand =
			this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		let prev = parseFloat(this.previousOperand);
		let current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '/':
				computation = prev + current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigit = parseFloat(stringNumber.split('.')[0]);
		const decimalDigit = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigit)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigit.toLocaleString('it-IT', {
				maximumFractionDigits: 0,
			});
		}

		if (decimalDigit != null) {
			return `${integerDisplay},${decimalDigit}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandText.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandText.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandText.innerText = '';
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operarionButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operarionButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
