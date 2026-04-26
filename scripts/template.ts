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