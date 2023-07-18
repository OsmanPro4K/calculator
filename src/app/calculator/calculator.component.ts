import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  buttons = [
    '(', ')', 'C', '←',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '+', '='
  ];

  displayValue = '';

  changeInnerHTML(...args: string[]) {
    const [buttonLabel] = args; // Extract the first argument (buttonLabel)
    if (buttonLabel === 'C') {
      this.displayValue = ''; // Clear the display
    } else if (buttonLabel === '←') {
      this.displayValue = this.displayValue.slice(0, -1); // Backspace functionality
    } else if (buttonLabel === '=') {
      this.evaluateExpression(); // Evaluate the arithmetic expression
    } else {
      this.displayValue += buttonLabel; // Append the clicked button label to the display
    }
  }

  evaluateExpression() {
    try {
      // Use regular expressions to separate numbers and operators
      const numbers = this.displayValue.match(/\d+(\.\d+)?/g); // Match all numbers (including decimals)
      const operators = this.displayValue.match(/[+\-*/]/g); // Match all arithmetic operators

      if (numbers && operators) {
        let result = parseFloat(numbers[0]); // Initialize result with the first number
        for (let i = 0; i < operators.length; i++) {
          const number = parseFloat(numbers[i + 1]); // Get the next number
          const operator = operators[i]; // Get the current operator

          // Perform the arithmetic operation based on the operator
          if (operator === '+') {
            result += number;
          } else if (operator === '-') {
            result -= number;
          } else if (operator === '*') {
            result *= number;
          } else if (operator === '/') {
            result /= number;
          }
        }

        this.displayValue = result.toString(); // Update the display with the final result
      }
    } catch (error) {
      this.displayValue = 'Error';
    }
  }
}
