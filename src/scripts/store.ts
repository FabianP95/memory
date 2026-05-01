export interface GameSettings {
    cards: 16 | 24 | 36,
    playerColor: "blue" | "orange",
    theme: "code" | "projects"
}

export const gameSettings: GameSettings = {
  cards: 16,
  playerColor: "blue",
  theme: "code",
};