import { GameSettings } from "./interface";
import { GameResults } from "./interface";
import { cardHidden } from "./template";
import { generateCardDeck } from "./cardStorage";

const raw = sessionStorage.getItem("gameSettings");
const settings: GameSettings = raw ? JSON.parse(raw) : null;
const board = document.getElementById('playField') as HTMLElement;
const dialog = document.getElementById('leave') as HTMLDialogElement;
const exitBtn = document.getElementById('exitBtn') as HTMLButtonElement;
const continueBtn = document.getElementById('continueGame') as HTMLButtonElement;
const leaveBtn = document.getElementById('leaveGame') as HTMLButtonElement;
const gridContainer = document.querySelector('.grid-container') as HTMLElement;

const scoreLeft = document.querySelector('.scoreboard__score-l') as HTMLElement;
const scoreRight = document.querySelector('.scoreboard__score-r') as HTMLElement;

const themePlayerMap: Record<string, { left: Player; right: Player }> = {
  code: { left: 'blue', right: 'orange' },
  projects: { left: 'orange', right: 'blue' }
};

const { left, right } = themePlayerMap[settings.theme];

scoreLeft.id = left === 'blue' ? 'resultBlue' : 'resultOrange';
scoreRight.id = right === 'blue' ? 'resultBlue' : 'resultOrange';

const showOrange = document.getElementById('orangeDisplay') as HTMLImageElement;
const showBlue = document.getElementById('blueDisplay') as HTMLImageElement;
const resultOrange = document.getElementById('resultOrange') as HTMLElement;
const resultBlue = document.getElementById('resultBlue') as HTMLElement;

let flippedCards: HTMLElement[] = [];
let lockBoard: boolean = false;
let pointsBlue: number = 0;
let pointsOrange: number = 0;
type Player = "blue" | "orange";
let currentPlayer: Player = settings.playerColor;


/**
 * Initializes the game board when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', (): void => {
  resizePlayField(settings.cards);
  renderCards(settings.cards, settings.theme);
  document.body.dataset.theme = settings.theme;
  addEventListCards();
  displayCurrentPlayer();
});

/**
 * Handles dialog backdrop click to close the exit confirmation dialog
 */
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
});

/**
 * Handles continue button click to close the exit confirmation dialog
 */
continueBtn.addEventListener("click", (e) => {
  closeDialog();
});

/**
 * Handles leave game button click to exit and return to home page
 */
leaveBtn.addEventListener("click", (e) => {
  window.location.href = '../../index.html';
});


/**
 * Handles exit button click to show the exit confirmation dialog
 */
exitBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dialog.showModal();
})

/**
 * Closes the exit confirmation dialog with a closing animation
 */
function closeDialog(): void {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}

/**
 * Renders memory cards on the board based on the specified count and theme
 * @param cardAmount - Total number of cards to render
 * @param theme - Game theme ('code' or 'projects')
 */
function renderCards(cardAmount: number, theme: string): void {
  if (theme === "code") {
    displayChosenDeck(cardAmount, 0)
  }
  if (theme === "projects") {
    displayChosenDeck(cardAmount, 1)
  }
}

/**
 * Displays the selected deck of shuffled cards on the board
 * @param cardAmount - Total number of cards to display
 * @param theme - Theme index (0 for code, 1 for projects)
 */
function displayChosenDeck(cardAmount: number, theme: number): void {
  let shuffledCards = generateCardDeck(cardAmount / 2, theme);
  let imgSrcFront;
  if (theme == 0) {
    imgSrcFront = '../../src/assets/img/game/board/cards_code/frontCode.png'
  } else {
    imgSrcFront = '../../src/assets/img/game/board/cards_projects/frontCard.png'
  }
  shuffledCards.forEach(card => {
    board.innerHTML += cardHidden(card.id, card.imageSrc, card.imageId, imgSrcFront);
  });
}

/**
 * Resizes the play field grid based on the number of cards
 * @param cardNumber - Total number of cards to display
 */
function resizePlayField(cardNumber: number): void {
  let cols, rows;
  if (cardNumber <= 16) {
    cols = 4; rows = 4;
  } else if (cardNumber <= 24) {
    cols = 6; rows = 4;
  } else {
    cols = 6; rows = 6;
  }
  gridContainer.style.setProperty('--cols', cols.toString());
  gridContainer.style.setProperty('--rows', rows.toString());
}


/**
 * Adds click event listeners to all memory cards on the board
 */
function addEventListCards(): void {
  let cards = gridContainer.querySelectorAll<HTMLElement>('.card');
  cards.forEach((card: HTMLElement) => {
    card.addEventListener('click', () => {
      if (lockBoard) return;
      turnoverCard(card);
    });
  });
}


/**
 * Flips a card over and checks for a match if two cards are flipped
 * @param card - The card element to flip
 */
function turnoverCard(card: HTMLElement): void {
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  card.classList.add('flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

/**
 * Checks if two flipped cards match and handles the outcome
 */
function checkForMatch(): void {
  lockBoard = true;
  const [a, b] = flippedCards;
  const isMatch = a.dataset.name === b.dataset.name;
  if (isMatch) {
    cardMatched(a, b)
  } else {
    setTimeout(() => {
      noMatch(a, b)
    }, 1000);
  }
}

/**
 * Resets the game state after a turn is complete
 * @param unflipped - Whether cards were unflipped (for future use)
 */
function resetTurn(unflipped: boolean): void {
  flippedCards = [];
  lockBoard = false;
}

/**
 * Handles successful card match - keeps cards flipped and awards point
 * @param a - First matched card
 * @param b - Second matched card
 */
function cardMatched(a: HTMLElement, b: HTMLElement): void {
  a.classList.add('matched');
  b.classList.add('matched');
  resetTurn(false);
  assignPoint();
}

/**
 * Handles non-matching cards - flips them back and switches player
 * @param a - First card that didn't match
 * @param b - Second card that didn't match
 */
function noMatch(a: HTMLElement, b: HTMLElement): void {
  a.classList.remove('flipped');
  b.classList.remove('flipped');
  resetTurn(true);
  switchPlayer()
}

/**
 * Assigns a point to the current player for a successful match
 */
function assignPoint(): void {
  if (currentPlayer === "orange") {
    pointsOrange++;
    resultOrange.innerText = pointsOrange.toString();
  } else {
    pointsBlue++;
    resultBlue.innerText = pointsBlue.toString();
  }
  directToResultPage();
}

/**
 * Checks if all cards have been matched and directs to result page if game is complete
 */
function directToResultPage(): void {
  if (pointsOrange + pointsBlue == settings.cards / 2) {
    decideWinner();
    setTimeout(() => {
      window.location.href = "../html/result.html";
    }, 5000);
  }
}

/**
 * Determines the game winner based on final scores
 */
function decideWinner(): void {
  switch (true) {
    case pointsBlue > pointsOrange: storeWinner('Blue Player');
      break;
    case pointsOrange > pointsBlue: storeWinner('Orange Player');
      break;
    case pointsOrange == pointsBlue: storeWinner('Draw');
      break;
  }
}

/**
 * Switches the current player and updates the display
 */
function switchPlayer(): void {
  if (currentPlayer === "orange") {
    currentPlayer = "blue";
    displayCurrentPlayer();
  } else {
    currentPlayer = "orange";
  }
  displayCurrentPlayer();
}

/**
 * Displays the current player's indicator on the screen
 */
function displayCurrentPlayer(): void {
  if (currentPlayer === "orange") {
    showBlue.classList.add('d-none');
    showOrange.classList.remove('d-none');
  } else {
    showOrange.classList.add('d-none');
    showBlue.classList.remove('d-none');
  }
}

/**
 * Stores the game results and winner to session storage
 * @param winner - The winner name ('Blue Player', 'Orange Player', or 'Draw')
 */
function storeWinner(winner: string) {
  let results: GameResults = {
    pointsBlue: pointsBlue,
    pointsOrange: pointsOrange,
    playerWinner: winner,
  };
  sessionStorage.setItem("gameResults", JSON.stringify(results));
}