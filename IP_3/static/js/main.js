// TODO: Write JavaScript code here! e.g. to test:
// console.log('Individual Project 1, ready to start!');

/*
  JavaScript techniques in this file:
    - console.log("...");  // Write a debug message to the console  
    - let _____ = ...;     // Creating a "variable" to store a number
    - function ___() {...  // Creating a "function" to label and store code
    - ______++;            // Add one to a variable
    - ______--;            // Subtract one from a variable
    - querySelector('#__') // Access an element with given ID
    - .textContent = ___;  // Set an element to  
    - .innerHTML = ___;  // Set an element to  
*/

// JavaScript code goes here!
console.log('Individual Project 3, ready to start!')

// Setting initial lives, correct count and incorrect count
let lives = 10;
let correctCount = 0;
let incorrectCount = 0;

// Creating a new function called correct
function correct() {
  // Logging to the debug console
  console.log("Correct Answer");

  correctCount++;

  // Updating the span with ID #correct_count
  document.querySelector('#correct_count').textContent = correctCount;
  document.querySelector('#message').textContent = 'Correct! Good Job!';
  
  if (correctCount === 5 && lives > 0) {
    console.log('Correct answers all found. You Win!');
    document.querySelector('#all_questions').innerHTML = '<h1 class="gameover">YOU WIN!</h1>';
  }

}

// Creating a new function called correct
function incorrect() {

  // Logging to the debug console
  console.log("Incorrect Answer");

  lives--;
  incorrectCount++;

  // Updating the span with ID #
  document.querySelector('#lives_count').textContent = lives;
  document.querySelector('#incorrect_count').textContent = incorrectCount;
  document.querySelector('#message').textContent = 'Incorrect! You lose a life.';

  if (lives === 0) {
    console.log('Lives left is 0. Game Over!');
    document.querySelector('#all_questions').innerHTML = '<h1 class="gameover">GAME OVER!</h1>';
  }

}

