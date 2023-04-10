
## Оплата

- Шашки - 200$
- Шахматы - 500$

# 230403 chess

https://www.chessprogramming.org/Main_Page


https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

https://en.wikipedia.org/wiki/Board_representation_(computer_chess)
https://en.wikipedia.org/wiki/Glossary_of_chess

https://en.wikipedia.org/wiki/Zobrist_hashing

https://en.wikipedia.org/wiki/En_passant

---
https://www.chess.com/article/view/chess-notation
https://chessboardjs.com/v2/examples#1002-fen-string
`rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`

---
https://en.wikipedia.org/wiki/Transposition_table

# d230322

https://github.com/shubhendusaurabh/draughts.js
no AI, Отличная библиотека во всем остальном
`A Javascript draughts/checkers library for move generation/validation, piece placement/movement, and draw detection`

https://github.com/QodeMaster/checkersInHTML
Какой-то AI есть, Один файл на всю реализацию 
`Play checkers against a minimax algorithm that at the moment of writing this description calculates the best move possible in the board. The AI is curently only able to "think" one move. Further improvements will accompany future updates.`

https://github.com/mkhorin/e-champ-draughts-thinker
Крутая библиотека, но какая-то больно большая я со внешними зависимостями
`Thinking bot for playing E-Champ Draughts`
[SolverWorker.js](https://github.com/mkhorin/e-champ-draughts-thinker/blob/master/web/club/SolverWorker.js)

https://github.com/AlexPetrusca/CheckersJS
Всего 2 файла, вся логика есть. Только операции отрисовки вырезать 
`Web-compatible minimax AI for checkers`.
`/- 230403` выбор оказался неудачным. Опыт разбора шашек полезный, но расковыривать саму библиотеку было ошибкой. 

---

https://github.com/ifmcjthenknczny/jsCheckers суперперегружен
https://github.com/oakmac/chessboard2
https://github.com/ayushvarma7/Checker_AI тут четкое ТЗ
https://github.com/Priyanshiguptaaa/American-Checkers-AI крутые доки, читаемый код

---

1. The checkerboard is an 8x8 grid of light and dark squares in the famous "checkerboard" pattern. Each player has a dark square on the far left and a light square on his far right. The double-corner sometimes mentioned is the distinctive pair of dark squares in the near right corner.
2. The checkers to be used shall be round and black and white in color. The pieces shall be placed on the dark squares. The starting position is with each player having twelve pieces, on the twelve dark squares closest to the player's edge of the board.
3. The black player moves first.
4. A player must move each turn. If the player cannot move, the player loses the game.
5. In each turn, a player can make a simple move, a single jump, or a multiple jump move.
	1. Simple move: Single pieces can move one adjacent square diagonally forward away from the player. A piece can only move to a vacant dark square.
	2. Single jump move: A player captures an opponent's piece by jumping over it, diagonally, to an adjacent vacant dark square. The opponent's captured piece is removed from the board. The player can never jump over, even without capturing, one of the player's own pieces. A player cannot jump the same piece twice.
	3. Multiple jump move: Within one turn, a player can make a multiple jump move with the same piece by jumping from vacant dark square to vacant dark square. The player must capture one of the opponent's pieces with each jump. The player can capture several pieces with a move of several jumps.
6. If a jump move is possible, the player must make that jump move. A multiple jump move must be completed. The player cannot stop part way through a multiple jump. If the player has a choice of jumps, the player can choose among them, regardless of whether some of them are multiple, or not.
7. When a single piece reaches the row of the board furthest from the player, i.e the king-row, by reason of a simple move, or as the completion of a jump, it becomes a king. This ends the player's turn. The opponent crowns the piece by placing a second piece on top of it.
8. A king follows the same move rules as a single piece except that a king can move and jump diagonally forward away from the player or diagonally backward toward the player. Within one multiple jump move, the jumps can be any combination of forward or backward jumps. At any point, if multiple jumps are available to a king, the player can choose among them.
9. A player who loses all of their pieces to captures loses the game.
