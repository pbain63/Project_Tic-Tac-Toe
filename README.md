# Tic Tac Toe Game

A browser-based Tic Tac Toe game built with HTML5, CSS3, and JavaScript, following modular design principles.

Tic Tac Toe Screenshot:

![Alt text](/assets/Tic%20Tac%20Toe%201.png?raw=true "TTT 1")

![Alt text](/assets/Tic%20Tac%20Toe%202.png?raw=true "TTT 2")

![Alt text](/assets/Tic%20Tac%20Toe%203.png?raw=true "TTT 3")

## Features

✅ Two-player mode (X and O) with customizable names.
✅ Responsive design works on desktop and mobile.
✅ Win/tie detection with dynamic result announcements.
✅ Restart game functionality with a button.
✅ Minimal global code using factory functions and IIFE modules.
✅ DOM manipulation to dynamically update the game board.

## How It Works

GameBoard: Manages the board state (3x3 array) and validates moves.

Player Factory: Creates player objects (name, marker).

Game Controller: Handles turn logic, win checks, and game flow.

Display Controller: Renders the board and handles DOM events.

## Installation

1. Clone the repo:

git clone https://github.com/pbain63/tic-tac-toe.git

2. Open **index.html** in your browser.

## Code Structure


tic-tac-toe/  
├── assets
├── index.html          # Main HTML structure  
├── style.css           # Styling  
├── script.js           # Game logic & DOM handling  
└── README.md  

## What I Learned

Modular JavaScript: Used factory functions and IIFE to avoid global scope pollution.

Separation of concerns: Split logic into gameboard, players, and display modules.

DOM manipulation: Dynamically updated the UI based on game state.

Event delegation: Efficiently handled click events for game squares.

Live Demo:

https://pbain63.github.io/Project_Tic-Tac-Toe/


Technologies: HTML5, CSS3, JavaScript