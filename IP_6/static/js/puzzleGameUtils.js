
// Note: The following two functions are complete for you, as the start of a puzzle game.

function renderGame(div) {
    // No need to edit this function at all! However, it is useful for reading for
    // reference..

    // ("div" is the div with ID #app)
    div.innerHTML = ''; // Clear any existing DOM

    // Create a "Next" button and attach
    let button = document.createElement('button');
    button.addEventListener('click', onNextClick); // Setup click event for button
    button.setAttribute('class', 'Tile Tile--button');
    button.textContent = 'NEXT >>'; // Since we use ".textContent", we can safely use ">>"
    div.append(button);

    // Now, setup a 6x6 table grid, using a classic style for-loop    
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    for (var i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (var j = 0; j < 6; j++) {
            let td = document.createElement('td');
            td.setAttribute('class', 'Tile Tile--empty');
            td.innerHTML = '&nbsp;';
            tr.append(td);
        }
        tbody.append(tr);
    }
    table.append(tbody);
    div.append(table); // Finally, attach the table to the outer div   
}


let nextCount = 0;

function onNextClick() {
    // No need to edit this function at all! However, it is useful for reading for
    // reference..

    // Simple counter for the "next count"
    nextCount++;
    document.querySelector('#next_count').textContent = nextCount;

    // Get the table in the #app div
    const table = document.querySelector('#app table');
    const tds = table.querySelectorAll('td'); // Get all "TDs" (table data cells)
    for (const td of tds) { // Loop through each one using for...of

     	// children.length < 1 means it's empty:
        if (td.children.length < 1) {
        
            // Let's "roll a dice" and possibly add 1 to this square
            if (Math.random() < 0.166) { // 1/6 squares, on average
                const numButton = document.createElement('button');
                numButton.setAttribute('class', 'Tile Tile--number');
                numButton.setAttribute('data-value', '1'); // Store the value "1" on the DOM for our use
                numButton.textContent = '1'; // Set '1' label
                setupNumberButton(numButton); // Call the function from main.js
                td.append(numButton); // Add to the td (table cell)
            }
        }
    }
}

renderGame(document.querySelector('#app'));
