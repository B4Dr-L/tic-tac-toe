# Tic-Tac-Toe with Minimax AI

A functional Tic-Tac-Toe application built with React and Tailwind CSS. This project supports standard local two-player matches as well as a single-player mode against an AI opponent powered by the Minimax algorithm.

[Test the Live Demo](https://B4Dr-L.github.io/tic-tac-toe/)

## Features

- **Game Modes:** Supports local player-vs-player matches and player-vs-AI matches. When playing against the AI, players can select whether the AI plays as X or O.
- **Minimax AI:** Single-player functionality driven by a recursive Minimax algorithm that calculates optimal moves based on the current board state.
- **Move History:** A time-travel feature that tracks and lists past turns, allowing players to review or jump back to a previous board state during a match.
- **Persistent Scoreboard:** Tracks total wins for X, wins for O, and ties. Scores are synchronized with `localStorage` to ensure statistics persist after page refreshes.

## Technical Stack

- **Library:** React (Functional components, Hooks)
- **Styling:** Tailwind CSS
- **Build Utility:** Vite
- **State & Persistence:** React State, Effects, and the browser LocalStorage API

## Project Structure

The core codebase is organized within the `src` directory:

```plaintext
src/
├── components/
│   ├── Board.jsx          # Grid layout rendering and cell components
│   ├── Gamemode.jsx       # Controls for toggling opponent configurations
│   ├── HistoryDisplay.jsx # Navigation panel for reviewing past turns
│   └── ScoreBoard.jsx     # Displays current match statistics and score resets
├── App.jsx            # Main state management and core game logic
├── index.css          # Global Tailwind CSS styles
├── main.jsx           # Application entry point
└── minimax.js         # Minimax algorithm decision tree logic
```

## Getting Started

To run this project locally, complete the following steps:

### 1. Clone the repository
```bash
git clone https://github.com/B4Dr-L/tic-tac-toe.git
cd tic-tac-toe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open the local address provided in your terminal output (typically `http://localhost:5173`) to view the application.