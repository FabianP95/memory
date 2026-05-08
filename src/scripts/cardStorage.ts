import { CardData } from "./interface";

const CARD_IMAGES = [
    [
        { imageId: 'angular', imageSrc: '/img/game/board/cards_code/angular.png' },
        { imageId: 'bootstrap', imageSrc: '/img/game/board/cards_code/bootstrap.png' },
        { imageId: 'css', imageSrc: '/img/game/board/cards_code/css.png' },
        { imageId: 'django', imageSrc: '/img/game/board/cards_code/django.png' },
        { imageId: 'firebase', imageSrc: '/img/game/board/cards_code/firebase.png' },
        { imageId: 'git', imageSrc: '/img/game/board/cards_code/git.svg' },
        { imageId: 'github', imageSrc: '/img/game/board/cards_code/github.png' },
        { imageId: 'html', imageSrc: '/img/game/board/cards_code/html.png' },
        { imageId: 'javascript', imageSrc: '/img/game/board/cards_code/javascript.png' },
        { imageId: 'node', imageSrc: '/img/game/board/cards_code/node.png' },
        { imageId: 'python', imageSrc: '/img/game/board/cards_code/python.png' },
        { imageId: 'react', imageSrc: '/img/game/board/cards_code/react.png' },
        { imageId: 'sass', imageSrc: '/img/game/board/cards_code/sass.png' },
        { imageId: 'sql', imageSrc: '/img/game/board/cards_code/sql.png' },
        { imageId: 'terminal', imageSrc: '/img/game/board/cards_code/terminal.png' },
        { imageId: 'typescript', imageSrc: '/img/game/board/cards_code/typescript.png' },
        { imageId: 'vscode', imageSrc: '/img/game/board/cards_code/vcCode.png' },
        { imageId: 'vue', imageSrc: '/img/game/board/cards_code/vue.png' }
    ],
    [
        { imageId: 'bowlNoodles', imageSrc: '/img/game/board/cards_projects/bowlNoodles.png' },
        { imageId: 'bowlSteam', imageSrc: '/img/game/board/cards_projects/bowlSteam.png' },
        { imageId: 'chat', imageSrc: '/img/game/board/cards_projects/chat.png' },
        { imageId: 'chefHat', imageSrc: '/img/game/board/cards_projects/chefHat.png' },
        { imageId: 'chefHatGreen', imageSrc: '/img/game/board/cards_projects/chefHatGreen.png' },
        { imageId: 'egg', imageSrc: '/img/game/board/cards_projects/egg.png' },
        { imageId: 'fin', imageSrc: '/img/game/board/cards_projects/fin.png' },
        { imageId: 'flower', imageSrc: '/img/game/board/cards_projects/flower.png' },
        { imageId: 'foodContainer', imageSrc: '/img/game/board/cards_projects/foodContainer.png' },
        { imageId: 'Frame', imageSrc: '/img/game/board/cards_projects/Frame.png' },
        { imageId: 'green', imageSrc: '/img/game/board/cards_projects/green.png' },
        { imageId: 'hat', imageSrc: '/img/game/board/cards_projects/hat.png' },
        { imageId: 'join', imageSrc: '/img/game/board/cards_projects/join.png' },
        { imageId: 'pokeball', imageSrc: '/img/game/board/cards_projects/pokeball.png' },
        { imageId: 'smiley', imageSrc: '/img/game/board/cards_projects/smiley.png' },
        { imageId: 'tictacttoe', imageSrc: '/img/game/board/cards_projects/tictacttoe.png' },
        { imageId: 'userIcon', imageSrc: '/img/game/board/cards_projects/userIcon.png' },
        { imageId: 'violet', imageSrc: '/img/game/board/cards_projects/violet.png' }
    ]
]

/**
 * Shuffles an array of items in random order
 * @template T - The type of items in the array
 * @param arr - Array to shuffle
 * @returns Shuffled copy of the array
 */
function shuffleImages<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * Generates a shuffled deck of card pairs based on the specified theme
 * @param pairCount - Number of pairs to generate
 * @param theme - Theme index (0 for code, 1 for projects)
 * @returns Array of shuffled card pairs with ids and image data
 */
export function generateCardDeck(pairCount: number, theme: number): CardData[] {
    const shuffledPool = shuffleImages(CARD_IMAGES[theme]);
    const selected = shuffledPool.slice(0, pairCount);
    const pairs: CardData[] = selected.flatMap((img, i) => [
        { id: `card-${i * 2}`, imageId: img.imageId, imageSrc: img.imageSrc },
        { id: `card-${i * 2 + 1}`, imageId: img.imageId, imageSrc: img.imageSrc },
    ]);
    return shuffleImages(pairs);
}