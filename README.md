# Memory Game

A classic memory matching game built with TypeScript, Vite, and Sass. Play against a friend, match pairs of cards, and compete for the highest score!

## 📋 Project Overview

This is an interactive two-player memory card game where players take turns flipping cards to find matching pairs. The game features multiple difficulty levels, two distinct themes (Code and Projects), and real-time score tracking. Built with modern web technologies for a smooth and responsive gaming experience.

## 🎮 How to Play

1. **Start the Game**: Launch the application and configure your game settings
2. **Choose Difficulty**: Select the number of cards (16, 24, or 36)
3. **Select Theme**: Pick between two themes:
   - **Code Theme**: Programming-related images
   - **Projects Theme**: Project-related images
4. **Select Starting Player**: Choose which player goes first (Blue or Orange)
5. **Gameplay**:
   - Players take turns flipping two cards
   - If the cards match, the player scores a point and gets another turn
   - If the cards don't match, they're flipped back and it's the next player's turn
   - Continue until all pairs are found
6. **Winner**: The player with the most matched pairs wins!

## 🎯 Game Features

- **Two-Player Mode**: Competitive gameplay between two players
- **Multiple Difficulty Levels**: 16, 24, or 36 card configurations
- **Dual Themes**: Choose between Code and Projects themed card decks
- **Real-Time Scoring**: Track points for both players during gameplay
- **Score Persistence**: View final results and game statistics
- **Responsive Design**: Plays smoothly on different screen sizes
- **Exit Confirmation**: Confirm before leaving a game in progress

## 🛠️ Technologies Used

- **TypeScript**: Type-safe JavaScript for robust game logic
- **Vite**: Modern build tool for fast development and optimized production builds
- **Sass**: Powerful CSS preprocessing with variables, mixins, and functions
- **HTML5**: Semantic markup for the game interface

## 📦 Project Structure

```
src/
├── scripts/
│   ├── game.ts           # Main game logic and mechanics
│   ├── cardStorage.ts    # Card deck management
│   ├── interface.ts      # TypeScript interfaces and types
│   ├── result.ts         # Results screen logic
│   ├── start_settings.ts # Game settings configuration
│   └── template.ts       # Card rendering templates
├── styles/
│   ├── main.scss         # Global styles
│   ├── abstracts/        # Variables, functions, mixins
│   ├── base/             # Base element styles and fonts
│   ├── components/       # Reusable component styles
│   ├── layout/           # Layout structure
│   ├── pages/            # Page-specific styles
│   └── themes/           # Theme variations
└── html/
    ├── game.html         # Game board page
    └── result.html       # Results page
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation & Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

The game supports easy customization:

- **Card Decks**: Add new card images in `public/img/game/board/`
- **Themes**: Modify theme colors in `src/styles/themes/`
- **Difficulty Levels**: Adjust card configurations in the settings
- **Fonts**: Custom fonts are included in `src/assets/fonts/`

## 📝 License

ISC