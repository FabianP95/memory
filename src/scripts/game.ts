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

const scoreLeft  = document.querySelector('.scoreboard__score-l') as HTMLElement;
const scoreRight = document.querySelector('.scoreboard__score-r') as HTMLElement;

const themePlayerMap: Record<string, { left: Player; right: Player }> = {
    code:     { left: 'blue',   right: 'orange' },
    projects: { left: 'orange', right: 'blue' }
};

const { left, right } = themePlayerMap[settings.theme];

scoreLeft.id  = left  === 'blue' ? 'resultBlue'   : 'resultOrange';
scoreRight.id = right === 'blue' ? 'resultBlue'   : 'resultOrange';

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


document.addEventListener('DOMContentLoaded', (): void => {
  resizePlayField(settings.cards);
  renderCards(settings.cards, settings.theme);
  document.body.dataset.theme = settings.theme;
  addEventListCards();
  displayCurrentPlayer();
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
});

continueBtn.addEventListener("click", (e) => {
  closeDialog();
});

leaveBtn.addEventListener("click", (e) => {
  window.location.href = '../../index.html';
});


exitBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dialog.showModal();
})

function closeDialog(): void {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}


function renderCards(cardAmount: number, theme: string): void {
  if (theme === "code") {
    displayChosenDeck(cardAmount, 0)
  }
  if (theme === "projects") {
    displayChosenDeck(cardAmount, 1)
  }
}

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


function addEventListCards(): void {
  let cards = gridContainer.querySelectorAll<HTMLElement>('.card');
  cards.forEach((card: HTMLElement) => {
    card.addEventListener('click', () => {
      if (lockBoard) return;
      turnoverCard(card);
    });
  });
}


function turnoverCard(card: HTMLElement): void {
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  card.classList.add('flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

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

function resetTurn(unflipped: boolean): void {
  flippedCards = [];
  lockBoard = false;
}

function cardMatched(a: HTMLElement, b: HTMLElement): void {
  a.classList.add('matched');
  b.classList.add('matched');
  resetTurn(false);
  assignPoint();
}

function noMatch(a: HTMLElement, b: HTMLElement): void {
  a.classList.remove('flipped');
  b.classList.remove('flipped');
  resetTurn(true);
  switchPlayer()
}

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

function directToResultPage(): void {
  if (pointsOrange + pointsBlue == settings.cards / 2) {
    decideWinner();
    setTimeout(() => {
      window.location.href = "../html/result.html";
    }, 5000);
  }
}

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

function switchPlayer(): void {
  if (currentPlayer === "orange") {
    currentPlayer = "blue";
    displayCurrentPlayer();
  } else {
    currentPlayer = "orange";
  }
  displayCurrentPlayer();
}

function displayCurrentPlayer(): void {
  if (currentPlayer === "orange") {
    showBlue.classList.add('d-none');
    showOrange.classList.remove('d-none');
  } else {
    showOrange.classList.add('d-none');
    showBlue.classList.remove('d-none');
  }
}

function storeWinner(winner: string) {
  let results: GameResults = {
    pointsBlue: pointsBlue,
    pointsOrange: pointsOrange,
    playerWinner: winner,
  };
  sessionStorage.setItem("gameResults", JSON.stringify(results));
}