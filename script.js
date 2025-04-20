const operationInput = document.getElementById("operation");
const buttons = document.querySelectorAll(".grid-container button");

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      // Clear the input
      operationInput.value = "";
    } else if (value === "⌫") {
      // Handle backspace (delete last character)
      operationInput.value = operationInput.value.slice(0, -1);
    } else if (value === "=") {
      // Evaluate the expression
      evaluateExpression();
    } else {
      // Append the button value to the input
      if (
        operationInput.value === "Math Error" ||
        operationInput.value === "Syntax Error"
      ) {
        operationInput.value = ""; // Clear the input if it shows an error
      }
      operationInput.value += value;
    }
  });
});

// Add event listener for the Enter key
operationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    evaluateExpression();
  }
});

// Function to evaluate the expression
function evaluateExpression() {
  try {
    const expression = operationInput.value
      .replace(/×/g, "*") // Replace 'x' with '*' for multiplication
      .replace(/÷/g, "/") // Replace '÷' with '/' for division
      .replace(/%/g, "/100"); // Replace '%' with '/100' for percentage

    const result = eval(expression); // Evaluate the expression

    // Handle invalid results like division by zero or Infinity
    if (!isFinite(result)) {
      operationInput.value = "Math Error"; // Division by zero or Infinity
    } else {
      operationInput.value = result; // Display the result
    }
  } catch (error) {
    // Handle syntax errors or other exceptions
    operationInput.value = "Syntax Error";
  }
}
