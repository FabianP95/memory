function landingPage(params: string) {
    return `
    <div class="content-wrapper">
        <div class="start-header">
            <h2 class="h2-start">It's play time</h2>
            <h1 class="h2-start">Ready to play?</h1>
        </div>
        <button class="btn start-btn">
            <img class="before-img" src="./public/assets/img/index/controllerBtn.svg" alt="small image of a controller">
            <span>Play</span>
            <img class="after-img" src="./public/assets/img/index/arrowDef.svg" alt="pointing arrow">
        </button>
    </div>
    <img class="start-img" src="./public/assets/img/index/controllerBig.png" alt="big image of a controller">
    `
}

function settingPage(params: string){
    return`
     <div class="content-wrapper flex-start">
        <h2 class="h2-settings">Settings</h2>
        <div class="settings-layout">
            <section>
                <article class="mrg-bt">
                    <div class="table-header">
                        <img src="./public/assets/img/game/settings/themes.png"
                            alt="palette symbolizing options to play">
                        <h3>Game themes</h3>
                    </div>
                    <ul class="list" id="theme">
                        <li class="list__item" data-id="code">
                            Code vibes theme
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                        <li class="list__item" data-id="projects">
                            DA Projects theme
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                    </ul>
                </article>
                <article class="mrg-bt">
                    <div class="table-header">
                        <img src="./public/assets/img/game/settings/chess_pawn.png" alt="chess pawn symbolizing player">
                        <h3>Choose player</h3>
                    </div>
                    <ul class="list" id="player">
                        <li class="list__item" data-id="blue">
                            Blue
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                        <li class="list__item" data-id="orange">
                            Orange
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                    </ul>
                </article>
                <article class="mrg-bt">
                    <div class="table-header">
                        <img src="./public/assets/img/game/settings/board_size.png"
                            alt="symbolizing amount of cards played with">
                        <h3>Board size</h3>
                    </div>
                    <ul class="list" id="amount">
                        <li class="list__item" data-id="16">
                            16 cards
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                        <li class="list__item" data-id="24">
                            24 cards
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                        <li class="list__item" data-id="36">
                            36 cards
                            <img src="./public/assets/img/game/settings/chosen.png" alt="selected option">
                        </li>
                    </ul>
                </article>
            </section>
            <section class="show-case">
                <img src="./public/assets/img/game/settings/screenCode.png" alt="example for gameboard style">
                <div class="info">
                    <span id="themeChosen">Game theme</span>
                    <img src="./public/assets/img/game/settings/seperatorDef.png"
                        alt="visual element for seperating options">
                    <span id="playerChosen">Player</span>
                    <img src="./public/assets/img/game/settings/seperatorDef.png"
                        alt="visual element for seperating options">
                    <span id="boardSize">Board size</span>
                    <button class="info__btn" disabled>
                        <img class="before-img" src="./public/assets/img/game/settings/startDisabled.svg" alt="icon for start sign">
                        <span>Start</span>
                    </button>
                </div>
            </section>
        </div>
    </div>
    `
}

function gameOverCode(params:string) {
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

function winnerCode(params:string) {
    return `
    <div class="content-wrapper pos">
        <img class="header-img" src="./public/assets/img/game/results/code_theme/confetti.png"
            alt="display of confetti">
        <p class="winner-p ">The winner is</p>
        <h2 class="h2-winner ">Orange Player</h2>
        <img src="./public/assets/img/game/results/code_theme/pawn-big-orange.png" alt="">
        <button class="btn back-btn">Back to start</button>
    </div>`
}

function gameOverProjects(params:string) {
    return `
    
    `
}

function winnerProjects(params:string) {
    return `
   
    `
}