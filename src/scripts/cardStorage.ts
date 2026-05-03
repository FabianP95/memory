import { CardData } from "./interface";

const CARD_IMAGES = [
    [
        { imageId: 'angular', imageSrc: '/src/assets/img/game/board/cards_code/angular.png' },
        { imageId: 'bootstrap', imageSrc: '/src/assets/img/game/board/cards_code/bootstrap.png' },
        { imageId: 'css', imageSrc: '/src/assets/img/game/board/cards_code/css.png' },
        { imageId: 'django', imageSrc: '/src/assets/img/game/board/cards_code/django.png' },
        { imageId: 'firebase', imageSrc: '/src/assets/img/game/board/cards_code/firebase.png' },
        { imageId: 'git', imageSrc: '/src/assets/img/game/board/cards_code/git.svg' },
        { imageId: 'github', imageSrc: '/src/assets/img/game/board/cards_code/github.png' },
        { imageId: 'html', imageSrc: '/src/assets/img/game/board/cards_code/html.png' },
        { imageId: 'javascript', imageSrc: '/src/assets/img/game/board/cards_code/javascript.png' },
        { imageId: 'node', imageSrc: '/src/assets/img/game/board/cards_code/node.png' },
        { imageId: 'python', imageSrc: '/src/assets/img/game/board/cards_code/python.png' },
        { imageId: 'react', imageSrc: '/src/assets/img/game/board/cards_code/react.png' },
        { imageId: 'sass', imageSrc: '/src/assets/img/game/board/cards_code/sass.png' },
        { imageId: 'sql', imageSrc: '/src/assets/img/game/board/cards_code/sql.png' },
        { imageId: 'terminal', imageSrc: '/src/assets/img/game/board/cards_code/terminal.png' },
        { imageId: 'typescript', imageSrc: '/src/assets/img/game/board/cards_code/typescript.png' },
        { imageId: 'vscode', imageSrc: '/src/assets/img/game/board/cards_code/vcCode.png' },
        { imageId: 'vue', imageSrc: '/src/assets/img/game/board/cards_code/vue.png' }
    ],
    [
        { imageId: 'bowlNoodles', imageSrc: '/src/assets/img/game/board/cards_projects/bowlNoodles.png' },
        { imageId: 'bowlSteam', imageSrc: '/src/assets/img/game/board/cards_projects/bowlSteam.png' },
        { imageId: 'chat', imageSrc: '/src/assets/img/game/board/cards_projects/chat.png' },
        { imageId: 'chefHat', imageSrc: '/src/assets/img/game/board/cards_projects/chefHat.png' },
        { imageId: 'chefHatGreen', imageSrc: '/src/assets/img/game/board/cards_projects/chefHatGreen.png' },
        { imageId: 'egg', imageSrc: '/src/assets/img/game/board/cards_projects/egg.png' },
        { imageId: 'fin', imageSrc: '/src/assets/img/game/board/cards_projects/fin.png' },
        { imageId: 'flower', imageSrc: '/src/assets/img/game/board/cards_projects/flower.png' },
        { imageId: 'foodContainer', imageSrc: '/src/assets/img/game/board/cards_projects/foodContainer.png' },
        { imageId: 'Frame', imageSrc: '/src/assets/img/game/board/cards_projects/Frame.png' },
        { imageId: 'green', imageSrc: '/src/assets/img/game/board/cards_projects/green.png' },
        { imageId: 'hat', imageSrc: '/src/assets/img/game/board/cards_projects/hat.png' },
        { imageId: 'join', imageSrc: '/src/assets/img/game/board/cards_projects/join.png' },
        { imageId: 'pokeball', imageSrc: '/src/assets/img/game/board/cards_projects/pokeball.png' },
        { imageId: 'smiley', imageSrc: '/src/assets/img/game/board/cards_projects/smiley.png' },
        { imageId: 'tictacttoe', imageSrc: '/src/assets/img/game/board/cards_projects/tictacttoe.png' },
        { imageId: 'userIcon', imageSrc: '/src/assets/img/game/board/cards_projects/userIcon.png' },
        { imageId: 'violet', imageSrc: '/src/assets/img/game/board/cards_projects/violet.png' }
    ]
]

function shuffleImages<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

export function generateCardDeck(pairCount: number, theme: number): CardData[] {
    const shuffledPool = shuffleImages(CARD_IMAGES[theme]);
    const selected = shuffledPool.slice(0, pairCount);
    const pairs: CardData[] = selected.flatMap((img, i) => [
        { id: `card-${i * 2}`, imageId: img.imageId, imageSrc: img.imageSrc },
        { id: `card-${i * 2 + 1}`, imageId: img.imageId, imageSrc: img.imageSrc },
    ]);
    return shuffleImages(pairs);
}