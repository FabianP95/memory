function gameOverCode(params: string): string  {
    return `
    <div class="content-wrapper">
        <h1 class="h1-go-c">Game Over</h1>
        <span class="span-go-c">Final score</span>
        <section class="scoreboard">
            <div class="scoreboard__container">
                <img src="./public/assets/img/game/results/code_theme/blue-label.png" alt="blue player label">
                <span class="scoreboard__b-write">Blue <span id="resultBlue">16</span></span>
            </div>
            <div class="scoreboard__container">
                <img src="./public/assets/img/game/results/code_theme/orange-label.png" alt="orange player label">
                <span class="scoreboard__o-write">Orange <span id="resultOrange">16</span></span>
            </div>
        </section>
    </div>`
}

function winnerCode(params: string): string  {
    return `
    <div class="content-wrapper pos">
        <img class="header-img" src="./public/assets/img/game/results/code_theme/confetti.png"
            alt="display of confetti">
        <p class="winner-c">The winner is</p>
        <h2 class="h2-winner ">Orange Player</h2>
        <img src="./public/assets/img/game/results/code_theme/pawn-big-orange.png" alt="">
        <button class="btn back-btn-c">Back to start</button>
    </div>`
}

function gameOverProjects(params: string): string  {
    return `
    <div class="content-wrapper">
        <h1 class="h1-go-p">GAME OVER</h1>
        <span class="span-go-p">Final score</span>
        <section class="scoreboard-projects">
            <div class="scoreboard-projects__container">
                <img src="./public/assets/img/game/results/projects_theme/pawn-label-blue.png" alt="blue chess pawn">
                <span class="scoreboard-projects__b-write" id="resultBlue">16</span>
            </div>
            <div class="scoreboard-projects__container">
                <img src="./public/assets/img/game/results/projects_theme/pawn-label-orange.png"
                    alt="orange chess pawn">
                <span class="scoreboard-projects__o-write" id="resultOrange">16</span>
            </div>
        </section>
    </div>
    `
}

function winnerProjects(params: string): string {
    return `
    <div class="content-wrapper ">
        <p class="winner-p">The winner is</p>
        <h2 class="h2-winner-p ">Orange Player</h2>
        <img src="./public/assets/img/game/results/projects_theme/pawn-big-orange.png" alt="big chess pawn">
        <button class="btn back-btn-p">Home</button>
    </div>
    `
}

