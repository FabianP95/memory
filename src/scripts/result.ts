import { GameResults } from "./interface";
import { GameSettings } from "./interface";
const rawResult = sessionStorage.getItem("gameResults");
const gameResults: GameResults = rawResult ? JSON.parse(rawResult) : null;
const rawSettings = sessionStorage.getItem("gameSettings");
const settings: GameSettings = rawSettings ? JSON.parse(rawSettings) : null;


const containerWinner = document.getElementById('containerWinner') as HTMLElement;
const declarationPhrase = containerWinner.querySelector<HTMLElement>('p');

const toStartBtn = document.getElementById('backToStart') as HTMLButtonElement;
const scoreLeft = document.querySelector('.scoreboard__score-l') as HTMLElement;
const scoreRight = document.querySelector('.scoreboard__score-r') as HTMLElement;
type Player = "blue" | "orange";
const themePlayerMap: Record<string, { left: Player; right: Player }> = {
    code: { left: 'blue', right: 'orange' },
    projects: { left: 'orange', right: 'blue' }
};

const { left, right } = themePlayerMap[settings.theme];

scoreLeft.id = left === 'blue' ? 'resultBlue' : 'resultOrange';
scoreRight.id = right === 'blue' ? 'resultBlue' : 'resultOrange';

const scoreBlue = document.getElementById('resultBlue') as HTMLElement;
const scoreOrange = document.getElementById('resultOrange') as HTMLElement;


/**
 * Initializes the results page when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', (): void => {
    document.body.dataset.theme = settings.theme;
    displayScore(gameResults.pointsBlue, gameResults.pointsOrange);
    setInfosWinner(gameResults.playerWinner);
    setDeclarationResult(gameResults.playerWinner)
    displayWinnerImg();
})


/**
 * Handles back to start button click - clears session and returns to home page
 */
toStartBtn.addEventListener('click', (): void => {
    sessionStorage.clear();
    window.location.href = '../../index.html';
})

/**
 * Displays the final scores for both players on the results page
 * @param scoreB - Blue player's score
 * @param scoreO - Orange player's score
 */
function displayScore(scoreB: number, scoreO: number) {
    scoreBlue.innerText = String(scoreB);
    scoreOrange.innerText = String(scoreO);
}


/**
 * Sets the winner information in the results container
 * @param winner - Name of the winner (e.g., 'Blue Player', 'Orange Player', 'Draw')
 */
function setInfosWinner(winner: string): void {
    let h2 = containerWinner.querySelector<HTMLHeadingElement>('h2');
    if (h2) {
        h2.innerText = winner;
        displayColorWinner(h2);
    }
}

/**
 * Applies the winner's color as a data attribute to style the winner heading
 * @param h2 - The heading element to apply the color styling to
 */
function displayColorWinner(h2: HTMLElement) {
    switch (true) {
        case gameResults.playerWinner == 'Orange Player':
            h2.dataset.winner = 'orange'
            break;
        case gameResults.playerWinner == 'Blue Player':
            h2.dataset.winner = 'blue'
            break;
        default: h2.dataset.winner = 'draw'
            break;
    }
}

/**
 * Sets the declaration phrase text based on the game result
 * @param result - The result string ('Draw' or winner name)
 */
function setDeclarationResult(result: string) {
    if (declarationPhrase) {
        switch (result) {
            case 'Draw':
                declarationPhrase.innerText = 'It`s a';
                break;
            default:
                declarationPhrase.innerText = 'The winner is';
                break;
        }
    }
}

/**
 * Displays the appropriate winner celebration image based on theme and result
 */
function displayWinnerImg() {
    switch (true) {
        case settings.theme == 'code' && gameResults.playerWinner !== 'Draw':
            setWinnerImg('blue is the winner', 'orange is the winner', 'scale blue');
            break;
        case settings.theme == 'projects' && gameResults.playerWinner !== 'Draw':
            setWinnerImg('Blue is the winner', 'Orange is the winner', 'scale red');
            break;
        case settings.theme == 'code' && gameResults.playerWinner == 'Draw':
            setWinnerImg('blue is the winner', 'orange is the winner', 'scale blue');
            document.querySelector<HTMLImageElement>(`img[alt="display of confetti"]`)?.classList.add('d-none');
            break;
        case settings.theme == 'projects' && gameResults.playerWinner == 'Draw':
            setWinnerImg('Blue is the winner', 'Orange is the winner', 'scale red');
            break;
    }
}

/**
 * Sets the winner image visibility based on the match result
 * @param blueAlt - Alt text for blue winner image
 * @param orangeAlt - Alt text for orange winner image
 * @param drawAlt - Alt text for draw/tie image
 */
function setWinnerImg(blueAlt: string, orangeAlt: string, drawAlt: string) {
    let imgOr = document.querySelector<HTMLImageElement>(`img[alt="${orangeAlt}"]`) as HTMLImageElement;
    let imgBl = document.querySelector<HTMLImageElement>(`img[alt="${blueAlt}"]`) as HTMLImageElement;
    let imgDraw = document.querySelector<HTMLImageElement>(`img[alt="${drawAlt}"]`) as HTMLImageElement;
    if (gameResults.playerWinner === 'Blue Player') {
        checkDisplayNone(imgBl, imgOr, imgDraw);
        return;
    }
    if (gameResults.playerWinner === 'Orange Player') {
        checkDisplayNone(imgOr, imgBl, imgDraw);
        return;
    } else {
        checkDisplayNone(imgDraw, imgOr, imgBl);
    }
}

/**
 * Manages display visibility of elements - shows one and hides others
 * @param elDisplay - Element to display
 * @param elHide - First element to hide
 * @param elHide2 - Second element to hide
 */
function checkDisplayNone(elDisplay: HTMLElement, elHide: HTMLElement, elHide2: HTMLElement): void {
    elDisplay.classList.remove('d-none');
    elHide.classList.add('d-none');
    elHide2.classList.add('d-none');
}
