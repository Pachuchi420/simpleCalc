document.addEventListener("DOMContentLoaded", function () {
    // Calculator dragging functionality
    const calculatorDiv = document.getElementById('calculatorDiv');
    calculatorDiv.style.position = "absolute"; // Ensure position is set to absolute
    calculatorDiv.style.top = "0px"; // Initial top position
    calculatorDiv.style.left = "0px"; // Initial left position
    const calculatorHandleGrid = calculatorDiv.querySelector('.calculatorHandleGrid');
    
    let offsetX, offsetY, initialX, initialY;
    let isDragging = false;

    calculatorHandleGrid.addEventListener('mousedown', function (e) {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        offsetX = calculatorDiv.offsetLeft;
        offsetY = calculatorDiv.offsetTop;
    });

    window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        
        const dx = e.clientX - initialX;
        const dy = e.clientY - initialY;

        calculatorDiv.style.left = (offsetX + dx) + 'px';
        calculatorDiv.style.top = (offsetY + dy) + 'px';
    });

    window.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // Calculator functionality
    let currentInput = "";
    let operator = "";
    let firstInput = "";

    // Fetch the display element
    const display = document.querySelector(".calculatorDisplay .displayText");

    // Add event listener to all buttons
    document.querySelectorAll('.calcButton').forEach(button => {
        button.addEventListener('click', function(e) {
            let value = e.target.innerHTML; // Get the button value

            if (['+', '-', 'x', '/'].includes(value)) { // Check if the button is an operator
                firstInput = currentInput;
                currentInput = "";
                operator = value;
            } else if (value === 'AC') { // Check if the button is AC to reset
                firstInput = "";
                currentInput = "";
                operator = "";
                display.innerHTML = "";
            } else if (value === "=") { // Check if the button is = to calculate
                firstInput = parseFloat(firstInput) || 0;
                currentInput = parseFloat(currentInput) || 0;
                let result = 0;

                switch (operator) {
                    case '+':
                        result = firstInput + currentInput;
                        break;
                    case '-':
                        result = firstInput - currentInput;
                        break;
                    case 'x':
                        result = firstInput * currentInput;
                        break;
                    case '/':
                        if (currentInput !== 0) {
                            result = firstInput / currentInput;
                        } else {
                            result = 'Error';
                        }
                        break;
                    default:
                        return;
                }
                
                display.innerHTML = result;
                firstInput = result;
                currentInput = "";
            } else if (value === '+/-') {
                currentInput = (parseFloat(currentInput) * -1).toString();
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
            } else { // Otherwise, it's a number or decimal
                currentInput += value;
            }

            // Update display
            display.innerHTML = currentInput === "" ? firstInput : currentInput;
        });
    });
});
