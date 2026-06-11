export function getBestMove(board, aiPlayer, checkWin) {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
    let bestScore = -Infinity;
    let bestMove = -1;

    // Look at all 9 squares
    for (let i = 0; i < 9; i++) {
        // If the square is empty, simulate making a move there
        if (board[i] === null) {
            board[i] = aiPlayer;
            
            // Run minimax on this simulated board path
            // depth starts at 0, and the next turn in the simulation will be the human's (false)
            let score = minimax(board, 0, false, aiPlayer, humanPlayer, checkWin);
            
            // Undo the simulated move so we don't mutate the real board state
            board[i] = null; 

            // If this path yields a better score than our previous best, save it
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer, checkWin) {
    // BASE CASE: Check if the simulated board has hit an end-game state
    const result = checkWin(board);
    if (result.status === 'win') {
        // Subtracting/adding depth rewards faster wins and slower losses
        return result.winner === aiPlayer ? 10 - depth : depth - 10;
    }
    if (result.status === 'tie') {
        return 0;
    }

    // AI's turn in the simulation: Maximize the score
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = aiPlayer;
                let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer, checkWin);
                board[i] = null; // Undo move
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } 
    // Human's turn in the simulation: Minimize the score
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = humanPlayer;
                let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer, checkWin);
                board[i] = null; // Undo move
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}