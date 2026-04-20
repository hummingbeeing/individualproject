// Your code will go into this file to complete the adventure game!
// See "TODO" for hints if you are stuck.

function setupGame() {

    let castleScene = { };
    castleScene.imageSource = './static/images/backdrops/Castle.png';
    castleScene.title = 'A Huge Stone Castle';
    setupScene(castleScene);

    // -TODO - Castle is complete. Complete "town" (almost done), "house", and "forest"
    let beachTownScene = { };
    beachTownScene.imageSource = './static/images/backdrops/BeachTown.png';
    beachTownScene.title = 'A Village by the Beach';
    setupScene(beachTownScene);

    // -TODO - The house scene needs new properties...
    let houseScene = { };
    //Hint: title is 'A Cosy Cottage in the Village'
    houseScene.imageSource = './static/images/backdrops/House.png';
    houseScene.title = 'A Cosy Cottage in the Village';
    setupScene(houseScene);

    // -TODO - The forest scene needs new properties and setupScene...
    let forestScene = { };
    //Hint: title is 'A Dark and Gloomy Forest'
    forestScene.imageSource = './static/images/backdrops/Forest.png';
    forestScene.title = 'A Dark and Gloomy Forest';
    setupScene(forestScene);

    // Now, add in our characters
    // -TODO - Farmer is complete. Complete "queen" and "knight".
    let farmer = {
        name: 'The Farmer',
        imageSource: './static/images/people/Farmer.png',
        dialog1: 'Learn JavaScript? Only if you ask me enough...',
        dialog2: 'Okay, okay! I am studying JavaScript now...',
        currentDialog: 'dialog1',
    };

    let queen = {
        name: 'The Queen',
        imageSource: './static/images/people/Queen.png',
        dialog1: 'Ask The Knight. If The Knight learns, I too shall learn.',
        dialog2: 'The Knight is starting? I guess is JS for me! (YOU WIN!)',
        currentDialog: 'dialog1',
    };
    // Hint - Queen dialog 1: 'Ask The Knight. If The Knight learns, I too shall learn.',
    // Hint - Queen dialog 2: 'The Knight is starting? I guess is JS for me! (YOU WIN!)',

    let knight = {
        name: 'The Knight',
        imageSource: './static/images/people/Knight.png',
        dialog1: 'I only will learn JavaScript if you get The Farmer to first!',
        dialog2: 'The Farmer is learning? Time to play catch up!',
        currentDialog: 'dialog1',
    };
    // Hint - Knight dialog 1: 'I only will learn JavaScript if you get The Farmer to first!',
    // Hint - Knight dialog 2: 'The Farmer is learning? Time to play catch up!',

    // TODO - Create "afterTalking" methods for all three below
    let askCount = 0;

    farmer.afterTalking = function () {
        askCount++;

        console.log('askCount', askCount);

        if (askCount > 1) { // asked 2 times, 3rd will succeed
            // change "currentDialog" to be "dialog2"
            farmer.currentDialog = 'dialog2';
        }
    };
    // Note: To understand why this changes dialog, see around line 93 of adventureGameEngine.js

    knight.afterTalking = function () {
        let knightaskCount = 0;
        knightaskCount++;
        console.log('Asked Knight');

        if (farmer.currentDialog == 'dialog2' && knightaskCount > 0) {
            knight.currentDialog = 'dialog2';
        }
    };

    queen.afterTalking = function () {
        let queenaskCount = 0;
        queenaskCount++;
        console.log('Asked Queen');

        if (knight.currentDialog == 'dialog2' && queenaskCount > 0) {
            queen.currentDialog = 'dialog2';
        }
    };

    // TODO -- Call "setupPerson" and "addPerson" for queen (castle) and knight (forest)
    setupPerson(farmer);
    houseScene.addPerson(farmer);

    setupPerson(knight);
    forestScene.addPerson(knight);

    setupPerson(queen);
    castleScene.addPerson(queen);

    // -Now, set-up our "web" of connections:
    castleScene.addDoor('Exit the castle to nearby beach town', beachTownScene);
    beachTownScene.addDoor('Enter house', houseScene);
    houseScene.addDoor('Exit house', beachTownScene);

    // -TODO -- Add a way to enter the forest and back into the castle
    beachTownScene.addDoor('Enter castle', castleScene);
    beachTownScene.addDoor('Wander off into the forest', forestScene);

    // -TODO -- Add TWO doors to exit the forest
    forestScene.addDoor('Enter the castle back door', castleScene);
    forestScene.addDoor('Walk back to the beach town', beachTownScene);
    // Hint - door 1: 'Enter the castle back door' (castle)
    // Hint - door 2: 'Walk back to the beach town' (beach)

    return castleScene;
}

function startGame() {
    // Start the game by being at the castle scene
    let castleScene = setupGame();
    castleScene.showScene('#game');
    castleScene.showDoors('#game');
    castleScene.showAllPeople('#game');
}

startGame();
