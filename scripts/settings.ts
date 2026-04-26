const theme = document.getElementById('theme');
const player = document.getElementById('player');
const size = document.getElementById('amount');
const themes = theme.querySelectorAll('.list__item');
const players = player.querySelectorAll('.list__item');
const amount = size.querySelectorAll('.list__item');


themes.forEach(theme => {
    theme.addEventListener('click', () => {
        themes.forEach(theme => {
            theme.classList.remove('is-selected');
        })
        theme.classList.add('is-selected');
        const isChosen = theme.classList.contains('is-selected');
        const itemId = theme.getAttribute('data-id');
        if (isChosen) {
            console.log(`Item ${itemId} was selected.`);
        } else {
            console.log(`Item ${itemId} was deselected.`);
        }
    });
});

players.forEach(player => {
    player.addEventListener('click', () => {
        players.forEach(player => {
            player.classList.remove('is-selected');
        })
        player.classList.add('is-selected');
        const isChosen = player.classList.contains('is-selected');
        const itemId = player.getAttribute('data-id');
        if (isChosen) {
            console.log(`Item ${itemId} was selected.`);
        } else {
            console.log(`Item ${itemId} was deselected.`);
        }
    });
});

amount.forEach(number => {
    number.addEventListener('click', () => {
        amount.forEach(number => {
            number.classList.remove('is-selected');
        })
        number.classList.add('is-selected');
        const isChosen = number.classList.contains('is-selected');
        const itemId = number.getAttribute('data-id');
        if (isChosen) {
            console.log(`Item ${itemId} was selected.`);
        } else {
            console.log(`Item ${itemId} was deselected.`);
        }
    });
});