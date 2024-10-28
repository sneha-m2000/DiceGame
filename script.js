let scores = [0, 0]; // Player scores
let currentPlayer = -1; // Start with -1 to indicate no active player at the beginning

const diceSound = document.getElementById('dice-sound');
const rollButton = document.getElementById('roll-button');
const resetButton = document.getElementById('reset-button');
const winnerDisplay = document.getElementById('winner');

// Initial default dice images (before any roll)
document.querySelector('#player1-dice').innerHTML = `<img src="assets/Images/dice-1.png" alt="Default Dice" class="dice-image">`;
document.querySelector('#player2-dice').innerHTML = `<img src="assets/Images/dice-1.png" alt="Default Dice" class="dice-image">`;

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1; // Random dice value between 1-6
    const diceImage = `assets/Images/dice-${diceValue}.png`; // Update dice image with new path

    // Update the current player's dice image and score
    if (currentPlayer === 0) {
        document.querySelector('#player1-dice img').src = diceImage; // Update dice image for Player 1
        scores[0] += diceValue; // Update Player 1 score
        document.getElementById('player1-score').innerText = `Score: ${scores[0]}`; // Display Player 1 score
    } else {
        document.querySelector('#player2-dice img').src = diceImage; // Update dice image for Player 2
        scores[1] += diceValue; // Update Player 2 score
        document.getElementById('player2-score').innerText = `Score: ${scores[1]}`; // Display Player 2 score
    }

    diceSound.play();

    // Check for a winner after updating scores
    checkForWinner();

    // Switch player turn and update the active player styling
    currentPlayer = currentPlayer === 0 ? 1 : 0; // Switch player turn

    // Update the active player's border
    updatePlayerBorder();
}

function updatePlayerBorder() {
    // Remove border from both players
    document.getElementById('player1-container').classList.remove('active-player');
    document.getElementById('player2-container').classList.remove('active-player');

    // Add border to the current player only if the game has started
    if (currentPlayer >= 0) { // Make sure the game has started
        document.getElementById(`player${currentPlayer + 1}-container`).classList.add('active-player');
    }
}

function checkForWinner() {
    const winSound = document.getElementById('win-sound'); // Get the win sound element

    if (scores[0] >= 20) {
        winnerDisplay.innerHTML = `<span>🎉 Player 1 Wins! 🎉</span>`; // Add emojis for a fun effect
        winSound.play(); // Play winning sound
        disableButtons();
    } else if (scores[1] >= 20) {
        winnerDisplay.innerHTML = `<span>🎉 Player 2 Wins! 🎉</span>`;
        winSound.play(); // Play winning sound
        disableButtons();
    } else {
        winnerDisplay.innerText = ""; // Clear the winner message if no one has won yet
    }
}

function disableButtons() {
    rollButton.disabled = true; // Disable the Roll Dice button
    resetButton.disabled = false; // Enable the Reset Game button
}

function resetGame() {
    scores = [0, 0]; // Reset scores
    currentPlayer = -1; // No active player before starting the game

    // Reset dice images to the default dice face
    document.querySelector('#player1-dice img').src = 'assets/Images/dice-1.png';
    document.querySelector('#player2-dice img').src = 'assets/Images/dice-1.png';

    // Reset displayed scores
    document.getElementById('player1-score').innerText = 'Score: 0';
    document.getElementById('player2-score').innerText = 'Score: 0';

    // Reset player highlight to none
    updatePlayerBorder(); // Ensure no active player before the game starts

    winnerDisplay.innerText = ""; // Clear the winner message

    rollButton.disabled = false; // Re-enable the Roll Dice button
    resetButton.disabled = true; // Disable the Reset Game button
}

// Attach event listeners
rollButton.addEventListener('click', rollDice);
resetButton.addEventListener('click', resetGame);

// No player has the active border at the start
updatePlayerBorder(); // Ensure that no borders are shown at the start
