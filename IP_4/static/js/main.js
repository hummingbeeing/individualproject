console.log('Individual Project#4: main.js is working.')

// Note: Two basic functions are here for you to examine.
// Open the Console to see the results.
function pressTwo() {
    expression = expression + '2';
    console.log('Two was pressed. New expression:', expression);
    updateDisplay();
}

function pressTimes() {
    expression = expression + '*';
    console.log('Times was pressed. New expression:', expression);
    updateDisplay();
}


/* ***************************************** */
// The following is the function structure of the solution.
// Feel free to use this as a guide, or change it to your own!

/*
   Updates the calculator display
*/
function updateDisplay() {
    let displayDiv = document.querySelector('#display')
    
    // Hint: Will eventually need changes!
    
    if (displayedExpression === '') {
        displayDiv.innerHTML = '&nbsp;';
    }
    else {
        displayDiv.innerHTML = displayedExpression;
    }
}

/*
   Deletes the last typed character
*/
function backspace() {
    // TODO: Fill this in!

    if (displayedExpression.length === 0) 
        return;

    let lastChar = _getLastCharacter(displayedExpression);
    let length = 1;

    if (lastChar === '²') {
        length = 3; // **2
    } else if (lastChar === '³') {
        length = 3; // **3
    } else if (lastChar === '%') {
        length = 5; // *0.01
    } else if (lastChar === '‰') {
        length = 6; // *0.001
    }

    expression = _removeLastCharacters(expression, length);
    displayedExpression = _removeLastCharacters(displayedExpression, 1);

    console.log('Last expression change removed. New expression:',displayedExpression);

    updateDisplay();
}

/*
   Clears what's typed
*/
function clearExpression() {
    // TODO: Fill this in!

    expression = '';
    displayedExpression = '';
    result = null;

    console.log('expression was cleared. displayedExpression was cleared.');

    updateDisplay();
}

/*
   Adds one symbol to the expression
*/
function typeSymbol(symbol) {
    // TODO: Fill this in!

    expression = expression + symbol;
    displayedExpression = displayedExpression + symbol;

    console.log('A button was pressed:', symbol);
    console.log('New expression:', expression);

    updateDisplay();
}

/*
   Adds one symbol to the expression, but with a different user-visible label
*/
function typeSpecialSymbol(symbol, label) {
    // TODO: Fill this in!

    expression = expression + symbol;
    displayedExpression = displayedExpression + label;

    console.log('A button was pressed:', symbol);
    console.log('New expression:', expression);

    updateDisplay();
}

/*
   Loads the numeric result of the last computation into the expression
*/
function loadResult() {
    // TODO: Fill this in!

    // expression = result.toString();
    displayedExpression = result.toString();
    console.log('Showing result instead of expression in display.');

    updateDisplay();
}


/*
   Appends the current expression to the "receipt" below the calculator
*/
function addToReceipt() {
    let receiptDiv = document.querySelector('#receipt_contents')
    // TODO: Fill this in!
    
    if (result === null) 
        return;
    
    expression = result.toString();
    // displayedExpression = result.toString();

    receipt = receipt + displayedExpression + ' = ' + result + '<br />';
    receiptDiv.innerHTML = receipt;

    console.log('Added to Receipt!');

}

/*
   Display error message to screen
*/
function showError(message) {
    // TODO: Fill this in!

    let errorDiv = document.querySelector('#error');
    errorDiv.textContent = message;

}

addToReceipt(); // Call right away to show the default message

