class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
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
      if (number === '.' && this.currentOperand.includes('.')) { return }
      else {
         this.currentOperand = this.currentOperand.toString() + number.toString();
      }
   }

   chooseOperation(operation) {
      if (this.currentOperand === '') { return }
      if (this.previousOperand !== '') { this.compute() }
      this.operation = operation;
      this.previousOperand = this.currentOperand + operation.toString();
      this.currentOperand = '';
   }

   compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) { return }
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
         case '÷':
            computation = prev / current;
            break;
         default: return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
   }

   updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.previousOperandTextElement.innerText = this.previousOperand;
   }
}

const numberButtons = document.querySelectorAll('[data-number]'),
   operationButtons = document.querySelectorAll('[data-operation]'),
   equalsButton = document.querySelector('[data-equals]'),
   deleteButton = document.querySelector('[data-delete]'),
   allClearButton = document.querySelector('[data-all-clear]'),
   previousOperandTextElement = document.querySelector('[data-previous]'),
   currentOperandTextElement = document.querySelector('[data-current]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);



numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
   })
});

operationButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
   })
});

equalsButton.addEventListener('click', button => {
   calculator.compute()
   calculator.updateDisplay()
});

allClearButton.addEventListener('click', button => {
   calculator.clear()
   calculator.updateDisplay()
});

deleteButton.addEventListener('click', button => {
   calculator.delete()
   calculator.updateDisplay()
});