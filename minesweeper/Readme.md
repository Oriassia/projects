# Minesweeper Game

Welcome to the Minesweeper Game! This project is a web-based implementation of the classic Minesweeper game, designed and developed entirely by me. The game provides a fun and interactive way to challenge your logic and problem-solving skills.

## Features

- **Three Difficulty Levels**: Choose from Easy, Medium, or Hard to match your skill level.
- **Dynamic Board Generation**: The game board is generated dynamically based on the chosen difficulty level.
- **Interactive Gameplay**: Use left-click to open a cell and right-click to mark a cell as a bomb.
- **Scoreboard**: Keep track of your best times and compare your performance over multiple sessions.

## Technologies Used

- **HTML**: The structure of the game is built using HTML, providing a semantic and organized layout.
- **CSS**: Styling is applied through CSS, including external fonts from [FontAwesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css) for icons.
- **JavaScript**: The game logic, interactivity, and dynamic content generation are handled using vanilla JavaScript.

## How to Play

1. **Start the Game**: Enter your name (optional) and click "Start new game" to begin.
2. **Select Difficulty**: Choose a difficulty level (Easy, Medium, Hard) to initialize the board.
3. **Gameplay**:
   - **Left-click**: Open a cell. If it's a bomb, the game ends.
   - **Right-click**: Mark a cell as a bomb.
4. **Winning the Game**: Successfully open all cells that are not bombs to win.
5. **Scoreboard**: View your scores and times by clicking on the "Score board" button.

## Project Structure

- **index.html**: The main HTML file containing the structure of the game.
- **minesweeper_style.css**: The CSS file for styling the game.
- **minesweeper-script.js**: The JavaScript file containing the game logic and interactivity.

## Local Storage

The game uses the browser's local storage to keep track of the scoreboard, allowing your scores to persist between sessions.

Enjoy playing Minesweeper!
