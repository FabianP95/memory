import { GameResults } from "./interface";
import { GameSettings } from "./interface";
const rawResult = sessionStorage.getItem("gameResults");
const gameResults: GameResults = rawResult ? JSON.parse(rawResult) : null;
const rawSettings = sessionStorage.getItem("gameSettings");
const settings: GameSettings = rawSettings ? JSON.parse(rawSettings) : null;

const scoreBlue = document.getElementById('resultBlue') as HTMLElement;
const scoreOrange = document.getElementById('resultOrange') as HTMLElement;
const containerResults = document.getElementById('containerResults') as HTMLElement;
const containerWinner = document.getElementById('containerWinner') as HTMLElement;
const declarationPhrase = containerWinner.querySelector<HTMLElement>('p');

document.addEventListener('DOMContentLoaded', (): void => {
    document.body.dataset.theme = settings.theme;
    displayScore(gameResults.pointsBlue, gameResults.pointsOrange);
    setInfosWinner(gameResults.playerWinner);
    setDeclarationResult(gameResults.playerWinner)
    switchContent();

})


function displayScore(scoreB: number, scoreO: number) {
    scoreBlue.innerText = String(scoreB);
    scoreOrange.innerText = String(scoreO);
}

function switchContent(): void {
    displayWinnerImg()
    setTimeout(() => {
        containerResults.classList.add('d-none');
        containerWinner.classList.remove('d-none');
    }, 2000);
}

function setInfosWinner(winner: string): void {
    let h2 = containerWinner.querySelector<HTMLHeadingElement>('h2');
    if (h2) {
        h2.innerText = winner;
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
            setWinnerImg('blue is the winner', 'orange is the winner','scale blue');
            break;

        case settings.theme == 'projects' && gameResults.playerWinner !== 'Draw':
            setWinnerImg('Blue is the winner', 'Orange is the winner','scale red');
            break;
    }

}

function setWinnerImg(blueAlt: string, orangeAlt: string, drawAlt:string) {
    let imgOr = document.querySelector<HTMLImageElement>(orangeAlt) as HTMLImageElement;
    let imgBl = document.querySelector<HTMLImageElement>(blueAlt) as HTMLImageElement;
    let imgDraw = document.querySelector<HTMLImageElement>(drawAlt) as HTMLImageElement;
    if (gameResults.playerWinner === 'Player Blue') {
        imgOr.classList.add('d-none');
        imgDraw.classList.add('d-none');

    } else {
        imgBl.classList.add('d-none');
        imgDraw.classList.add('d-none');
    }
}