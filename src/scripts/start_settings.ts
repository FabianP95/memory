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


/**
 * Initializes the settings page when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', (): void => {
    addEventListeners();
    renderContentComingBack();
});

/**
 * Restores previous game settings if available from session storage
 */
function renderContentComingBack(): void {
    if (settingsStored !== null) {
        switchContent();
        addBodySettings();
    }
}

/**
 * Adds all event listeners for the settings interface
 */
function addEventListeners() {
    activateStartBtn();
    setting(themes);
    setting(players);
    setting(amount);
}

/**
 * Activates the start button to navigate to settings
 */
function activateStartBtn(): void {
    startBtn.addEventListener('click', () => {
        addBodySettings();
        switchContent();
    })
}

/**
 * Handles selection state for game settings (theme, player, board size)
 * @param settings - NodeList of setting option elements
 */
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

/**
 * Validates if a setting has been selected and triggers display update
 * @param state - Whether the setting is selected
 * @param id - The identifier of the selected setting
 */
function checkSettingState(state: boolean, id: string | null): void {
    if (state && id) {
        displaySettings(id);
    }
};

/**
 * Routes the selected setting to the appropriate handler function
 * @param data - The setting identifier to display
 */
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

/**
 * Sets the selected player and updates game settings
 * @param player - Selected player color ('blue' or 'orange')
 */
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

/**
 * Sets the board size and updates game settings
 * @param size - Selected board size ('16', '24', or '36')
 */
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


/**
 * Sets the game theme and updates display and game settings
 * @param theme - Selected theme ('code' or 'projects')
 */
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

/**
 * Enables the start game button when all settings are configured
 */
function activateGameBtn(): void {
    if (checkAllSet()) {
        startGame.disabled = false;
        let img: HTMLImageElement = startGame.querySelector<HTMLImageElement>('img') as HTMLImageElement;
        img.src = './img/game/settings/startActive.png';
        startGame.classList.add('btn');
        startGame.addEventListener('click', (): void => {
            sessionStorage.setItem("gameSettings", JSON.stringify(gameSettings));
            window.location.href = './src/html/game.html';
        });
    }
}

/**
 * Validates if all game settings have been selected
 * @returns True if theme, player, and board size are all set
 */
function checkAllSet(): boolean {
    return (document.getElementById('themeChosen') as HTMLElement).innerText != 'Theme' && (document.getElementById('playerChosen') as HTMLElement).innerText != 'Player' && (document.getElementById('boardSize') as HTMLElement).innerText != 'Board size';
}

/**
 * Updates the body element styling for settings view
 */
function addBodySettings(): void {
    body.classList.remove('body-start');
    body.classList.add('body-settings');
}

/**
 * Toggles visibility between start and settings content
 */
function switchContent(): void {
    start.classList.add('d-none');
    settings.classList.remove('d-none');
}


