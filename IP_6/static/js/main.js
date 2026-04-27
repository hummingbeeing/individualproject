// main.js

// Edit this file to add any necessary functions or code to complete the assignment.

// Hint: The "hints/" directory contains more JavaScript hints, including function suggestions.

function getMatchingButtons(numberButton) {

    console.log('-------- getMatchingButtons() called');

    let myValue = numberButton.getAttribute('data-value');
    let myTD = numberButton.parentNode;
    let myTR = myTD.parentNode;

    let buttons = [];

    let myIndex = Array.from(myTR.children).indexOf(myTD);


    // Right
    let nextTD = myTD.nextElementSibling;
    if (nextTD) {
        let nextButton = nextTD.querySelector('button');
        if (nextButton && nextButton.getAttribute('data-value') === myValue) {
            buttons.push(nextButton);
        }
    }

    // Left
    let prevTD = myTD.previousElementSibling;
    if (prevTD) {
        let prevButton = prevTD.querySelector('button');
        if (prevButton && prevButton.getAttribute('data-value') === myValue) {
            buttons.push(prevButton);
        }
    }

    // Down
    let nextTR = myTR.nextElementSibling;
    if (nextTR) {
        let nextTDDown = nextTR.children[myIndex];
        if (nextTDDown) {
            let downButton = nextTDDown.querySelector('button');
            if (downButton && downButton.getAttribute('data-value') === myValue) {
                buttons.push(downButton);
            }
        }
    }

    // Up
    let prevTR = myTR.previousElementSibling;
    if (prevTR) {
        let prevTDUp = prevTR.children[myIndex];
        if (prevTDUp) {
            let upButton = prevTDUp.querySelector('button');
            if (upButton && upButton.getAttribute('data-value') === myValue) {
                buttons.push(upButton);
            }
        }
    }

    return buttons;
}


function setupNumberButton(numberButton) {

    let hover = [];

    // Click
    numberButton.addEventListener('click', function () {

        //alert('Button was clicked! ' + numberButton.textContent);
        console.log('Button was clicked! ' + numberButton.textContent);


        let buttons = getMatchingButtons(numberButton);

        if (buttons.length >= 2) {

            for (let button of hover) {
                button.parentNode.classList.remove('Tile--highlight');
            }
            hover = [];

            let value = parseInt(numberButton.getAttribute('data-value'));
            let sum = value * (buttons.length + 1);

            let parentTD = numberButton.parentNode;

            for (let button of buttons) {
                button.remove();
            }

            numberButton.remove();

            let newButton = document.createElement('button');
            newButton.className = 'Tile Tile--number';
            newButton.setAttribute('data-value', sum);
            newButton.textContent = sum;

            setupNumberButton(newButton);
            parentTD.append(newButton);
        }
    });

    // Mouseover
    numberButton.addEventListener('mouseover', function () {

        console.log('-------- mouseover() called');

        let buttons = getMatchingButtons(numberButton);

        for (let button of hover) {
            button.parentNode.classList.remove('Tile--highlight');
        }
        hover = [];

        if (buttons.length >= 2) {

            for (let button of buttons) {
                button.parentNode.classList.add('Tile--highlight');
                hover.push(button);
            }
        }
    });

    // Mouseleave
    numberButton.addEventListener('mouseleave', function () {

        console.log('-------- mouseleave() called');

        for (let button of hover) {
            button.parentNode.classList.remove('Tile--highlight');
        }

        hover = [];
    });
}


console.log('Main.js loaded');


