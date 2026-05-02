import { GameSettings } from "./store";
import { cardHidden } from "./template";

const raw = sessionStorage.getItem("gameSettings");
const settings: GameSettings = raw ? JSON.parse(raw) : null;
const board = document.getElementById('playField') as HTMLElement;
const dialog = document.getElementById('leave') as HTMLDialogElement;
const exitBtn = document.getElementById('exitBtn') as HTMLButtonElement;
const continueBtn = document.getElementById('continueGame') as HTMLButtonElement;
const leaveBtn = document.getElementById('leaveGame') as HTMLButtonElement;
const gridContainer = document.querySelector('.grid-container') as HTMLElement;

document.addEventListener('DOMContentLoaded', (): void => {
  resizePlayField(settings.cards);
  renderCards(settings.cards);
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

function closeDialog() {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}


function renderCards(cardAmount: number): void {
  for (let i = 0; i < cardAmount; i++) {
    board.innerHTML += cardHidden();
  }
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



