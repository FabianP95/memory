export function cardHidden(imgId:string, imgSrc:string, imgData:string, themeFront:string): string {
    return `
    <div class="card" data-name="${imgData}">
        <div class="card__inner">
            <div class="card__front">
                <img src="${themeFront}" alt="front of a memory card">
            </div>
            <div class="card__back">
                <img src="../..${imgSrc}" alt="${imgId}}">
            </div>
        </div>
    </div>
`
}
