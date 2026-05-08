/**
 * Generates HTML markup for a hidden memory card element
 * @param imgId - Identifier for the card image
 * @param imgSrc - Source path to the card's back image
 * @param imgData - Data attribute value for matching card pairs
 * @param themeFront - Source path to the card front image
 * @returns HTML string representing a memory card
 */
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
