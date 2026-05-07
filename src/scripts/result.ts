import { GameResults } from "./interface";
import { GameSettings } from "./interface";
const rawResult = sessionStorage.getItem("gameResults");
const gameResults: GameResults = rawResult ? JSON.parse(rawResult) : null;
const rawSettings = sessionStorage.getItem("gameSettings");
const settings: GameSettings = rawSettings ? JSON.parse(rawSettings) : null;

const scoreBlue = document.getElementById('resultBlue') as HTMLElement;
const scoreOrange = document.getElementById('resultOrange') as HTMLElement;
const containerWinner = document.getElementById('containerWinner') as HTMLElement;
const declarationPhrase = containerWinner.querySelector<HTMLElement>('p');

const toStartBtn = document.getElementById('backToStart') as HTMLButtonElement;

toStartBtn.addEventListener('click', (): void => {
    sessionStorage.clear();
    window.location.href = '../../index.html';
})

document.addEventListener('DOMContentLoaded', (): void => {
    document.body.dataset.theme = settings.theme;
    displayScore(gameResults.pointsBlue, gameResults.pointsOrange);
    setInfosWinner(gameResults.playerWinner);
    setDeclarationResult(gameResults.playerWinner)
    displayWinnerImg();
})


function displayScore(scoreB: number, scoreO: number) {
    scoreBlue.innerText = String(scoreB);
    scoreOrange.innerText = String(scoreO);
}


function setInfosWinner(winner: string): void {
    let h2 = containerWinner.querySelector<HTMLHeadingElement>('h2');
    if (h2) {
        h2.innerText = winner;
        displayColorWinner(h2);
    }
}

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

function displayWinnerImg() {
    switch (true) {
        case settings.theme == 'code' && gameResults.playerWinner !== 'Draw':
            console.log(1);

            setWinnerImg('blue is the winner', 'orange is the winner', 'scale blue');
            break;

        case settings.theme == 'projects' && gameResults.playerWinner !== 'Draw':
            console.log(2);

            setWinnerImg('Blue is the winner', 'Orange is the winner', 'scale red');
            break;
    }

}

function setWinnerImg(blueAlt: string, orangeAlt: string, drawAlt: string) {
    let imgOr = document.querySelector<HTMLImageElement>(`img[alt="${orangeAlt}"]`) as HTMLImageElement;
    let imgBl = document.querySelector<HTMLImageElement>(`img[alt="${blueAlt}"]`) as HTMLImageElement;
    let imgDraw = document.querySelector<HTMLImageElement>(`img[alt="${drawAlt}"]`) as HTMLImageElement;
    if (gameResults.playerWinner === 'Blue Player') {
        imgBl.classList.remove('d-none');
        imgOr.classList.add('d-none');
        imgDraw.classList.add('d-none');
        return;
    }
    if (gameResults.playerWinner === 'Orange Player') {
        imgOr.classList.remove('d-none');
        imgBl.classList.add('d-none');
        imgDraw.classList.add('d-none');
        return;
    } else {
        imgDraw.classList.remove('d-none');
        imgBl.classList.add('d-none');
        imgOr.classList.add('d-none');
    }
}


document.addEventListener('DOMContentLoaded', (): void => {
    document.body.dataset.theme = settings.theme;
    displayScore(gameResults.pointsBlue, gameResults.pointsOrange);
    setInfosWinner(gameResults.playerWinner);
    setDeclarationResult(gameResults.playerWinner)
    displayWinnerImg();
})