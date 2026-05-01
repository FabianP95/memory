import { GameSettings } from "./store";
import { cardHidden } from "./template";

const raw = sessionStorage.getItem("gameSettings");
const settings: GameSettings = raw ? JSON.parse(raw) : null;
const board = document.getElementById('playField') as HTMLElement;
const dialog = document.getElementById('leave') as HTMLDialogElement;
const exitBtn = document.getElementById('exitBtn') as HTMLButtonElement;
//const gridContainer = document.querySelector('.grid-container');
//const itemCount = gameSettings.cards;



document.addEventListener('DOMContentLoaded', (): void => {
    renderCards(settings.cards);
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    closeDialog();
  }
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



// Logic to determine grid dimensions based on your specific requirements
//let cols, rows;
//if (itemCount <= 12) {
//    cols = 4; rows = 4;
//} else if (itemCount <= 24) {
//    cols = 6; rows = 4;
//} else {
//    cols = 6; rows = 6;
//}

// Apply the dimensions to the container via CSS Variables
//gridContainer.style.setProperty('--cols', cols);
//gridContainer.style.setProperty('--rows', rows);

// The Loop to generate items
//for (let i = 0; i < itemCount; i++) {
//    const item = document.createElement('div');
//    item.classList.add('grid-item');
//    item.innerHTML = '<div class="icon"></div>';
//    gridContainer.appendChild(item);
//}