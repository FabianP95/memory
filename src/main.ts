import './styles/main.scss';

const gridContainer = document.querySelector('.grid-container');
const itemCount = 36; // Change this to 12, 24, or 36 to test

// Logic to determine grid dimensions based on your specific requirements
let cols, rows;
if (itemCount <= 12) {
    cols = 4; rows = 4;
} else if (itemCount <= 24) {
    cols = 6; rows = 4;
} else {
    cols = 6; rows = 6;
}

// Apply the dimensions to the container via CSS Variables
gridContainer.style.setProperty('--cols', cols);
gridContainer.style.setProperty('--rows', rows);

// The Loop to generate items
//for (let i = 0; i < itemCount; i++) {
//    const item = document.createElement('div');
//    item.classList.add('grid-item');
//    item.innerHTML = '<div class="icon"></div>';
//    gridContainer.appendChild(item);
//}