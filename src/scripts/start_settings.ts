import { gameSettings } from "./interface";
import { GameSettings } from "./interface";
const body = document.getElementById('body') as HTMLElement;
const start = document.getElementById('startContent') as HTMLElement;
const settings = document.getElementById('settingsContent') as HTMLElement;
const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
const raw = sessionStorage.getItem("gameSettings");
const settingsStored: GameSettings = raw ? JSON.parse(raw) : null;
const theme = document.getElementById('theme') as HTMLElement;
const player = document.getElementById('player') as HTMLElement;
const size = document.getElementById('amount') as HTMLElement;
const themes = theme.querySelectorAll<HTMLElement>('.list__item');
const players = player.querySelectorAll<HTMLElement>('.list__item');
const amount = size.querySelectorAll<HTMLElement>('.list__item');
const startGame = document.getElementById('startGame') as HTMLButtonElement;


document.addEventListener('DOMContentLoaded', (): void => {
    addEventListeners();
    renderContentComingBack();
});

function renderContentComingBack(): void {
    if (settingsStored !== null) {
        switchContent();
        addBodySettings();
    }
}

function addEventListeners() {
    activateStartBtn();
    setting(themes);
    setting(players);
    setting(amount);
}

function activateStartBtn(): void {
    startBtn.addEventListener('click', () => {
        addBodySettings();
        switchContent();
    })
}

function setting(settings: NodeListOf<HTMLElement>): void {
    settings.forEach((element: HTMLElement) => {
        element.addEventListener('click', () => {
            settings.forEach((element: HTMLElement) => {
                element.classList.remove('is-selected');
            })
            element.classList.add('is-selected');
            const isChosen: boolean = element.classList.contains('is-selected');
            const itemId: string | null = element.getAttribute('data-id');
            checkSettingState(isChosen, itemId)
        });
    });
}

function checkSettingState(state: boolean, id: string | null): void {
    if (state && id) {
        displaySettings(id);
    }
};

function displaySettings(data: string) {
    switch (data) {
        case 'code':
        case 'projects':
            setTheme(data);
            break;
        case 'blue':
        case 'orange':
            setPlayer(data);
            break;
        case '16':
        case '24':
        case '36':
            setSize(data);
            break;
    }
}


function setPlayer(player: "blue" | "orange"): void {
    if (player === 'blue') {
        (document.getElementById('playerChosen') as HTMLElement).innerText = 'Blue-Player';
    } else if (player === 'orange') {
        (document.getElementById('playerChosen') as HTMLElement).innerText = 'Orange-Player';
    }
    document.querySelector<HTMLImageElement>('[data-sep="1-def"]')?.classList.add('d-none');
    document.querySelector<HTMLImageElement>('[data-sep="1-act"]')?.classList.remove('d-none');
    gameSettings.playerColor = player;
    activateGameBtn();
}

function setSize(size: string): void {
    if (size === '16') {
        (document.getElementById('boardSize') as HTMLElement).innerText = 'Board-16 Cards';
    }
    if (size === '24') {
        (document.getElementById('boardSize') as HTMLElement).innerText = 'Board-24 Cards';
    } else if (size === '36') {
        (document.getElementById('boardSize') as HTMLElement).innerText = 'Board-36 Cards';
    }
    document.querySelector<HTMLImageElement>('[data-sep="2-def"]')?.classList.add('d-none');
    document.querySelector<HTMLImageElement>('[data-sep="2-act"]')?.classList.remove('d-none');
    gameSettings.cards = parseInt(size) as 16 | 24 | 36;
    activateGameBtn();
}


function setTheme(theme: "code" | "projects"): void {
    if (theme === 'code') {
        (document.getElementById('themeChosen') as HTMLElement).innerText = 'Code theme';
        document.querySelector<HTMLImageElement>('img[data-theme="projects"]')?.classList.add('d-none');
        document.querySelector<HTMLImageElement>('img[data-theme="code"]')?.classList.remove('d-none');

    } else if (theme === 'projects') {
        (document.getElementById('themeChosen') as HTMLElement).innerText = 'Project theme';
        document.querySelector<HTMLImageElement>('img[data-theme="code"]')?.classList.add('d-none');
        document.querySelector<HTMLImageElement>('img[data-theme="projects"]')?.classList.remove('d-none');

    }
    gameSettings.theme = theme;
    activateGameBtn();
}

function activateGameBtn(): void {
    if (checkAllSet()) {
        startGame.disabled = false;
        let img: HTMLImageElement = startGame.querySelector<HTMLImageElement>('img') as HTMLImageElement;
        img.src = './src/assets/img/game/settings/startActive.png';
        startGame.classList.add('btn');
        startGame.addEventListener('click', (): void => {
            sessionStorage.setItem("gameSettings", JSON.stringify(gameSettings));
            window.location.href = './src/html/game.html';
        });
    }
}

function checkAllSet(): boolean {
    return (document.getElementById('themeChosen') as HTMLElement).innerText != 'Theme' && (document.getElementById('playerChosen') as HTMLElement).innerText != 'Player' && (document.getElementById('boardSize') as HTMLElement).innerText != 'Board size';
}

function addBodySettings(): void {
    body.classList.remove('body-start');
    body.classList.add('body-settings');
}

function switchContent(): void {
    start.classList.add('d-none');
    settings.classList.remove('d-none');
}


