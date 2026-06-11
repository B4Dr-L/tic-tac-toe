import { useEffect, useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import HistoryDisplay from "./components/HistoryDisplay";
import { getBestMove } from "./minimax";
import Gamemode from "./components/Gamemode";

const checkWin = (currentBoard) => {
    const POSSIBLE_WINNING_POSITIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    //check if someone won:
    let winningPositions = POSSIBLE_WINNING_POSITIONS.filter(winPos => {
        const [a, b, c] = winPos;
        return currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c];
        }
    )

    //check if there is any winning positions
    if (winningPositions.length > 0){
        return {
            status:'win',
            winner:currentBoard[winningPositions[0][0]],
            pos:[...new Set(winningPositions.flat())]
        }
    }

    if (currentBoard.every(square => square !== null)){
        return {status:'tie'}
    }

    return {status:'onGoing'}
};

function App() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currIndex, setCurrIndex] = useState(0)
    const [score, setScore] = useState(()=>
        JSON.parse(localStorage.getItem('score')) ?? { X: 0, O: 0, Tie: 0 }
    )
    const [aiPlayer, setAiPlayer] = useState(null)

    let xTurn = currIndex % 2 === 0
    let board = history[currIndex]
    let aiTurn = aiPlayer && ((xTurn && aiPlayer === 'X') || (!xTurn && aiPlayer === 'O'))

    let gameResult = checkWin(board)

    const handleCurrIndex = (index) => {
        setCurrIndex(index)
    }

    const appendHistory = (newBoard) =>{
        setHistory([...history.slice(0, currIndex + 1), newBoard]);
        setCurrIndex(currIndex+1)
    }

    const handleClickSquare = (index) => {
        //ignore click if square is full, or the game has ended, or its the AI's turn
        if (board[index] !== null || gameResult.status !== 'onGoing' || aiTurn) return;

        let newBoard = [...board]
        newBoard[index] = xTurn ? 'X' : 'O'
        appendHistory(newBoard)
    };

    const handleResetScore = () => {
        setScore({ X: 0, O: 0, Tie: 0 })
    }

    const handleRestart = () =>{
        setHistory([Array(9).fill(null)])
        setCurrIndex(0)

        //check if the game ended and update the score
        if (gameResult.status === 'win'){
            setScore(prevScore => ({
                ...prevScore,
                [gameResult.winner]: prevScore[gameResult.winner] + 1
            }))
        } else if (gameResult.status === 'tie') {
            setScore(prevScore => ({
                ...prevScore,
                Tie: prevScore.Tie + 1
            }))
        }
    }

    useEffect(()=>{
        localStorage.setItem('score', JSON.stringify(score))
    },[score])
    
    useEffect(()=>{
        if (!aiPlayer || gameResult.status !== 'onGoing') return;
        if(!aiTurn) return;

        const timeoutId = setTimeout(() => {
            const bestMoveIndex = getBestMove([...board], aiPlayer, checkWin); 
            let newBoard = [...board];
            newBoard[bestMoveIndex] = aiPlayer;
            appendHistory(newBoard);
        }, 100);
        return () => clearTimeout(timeoutId);
    },[currIndex,aiPlayer])

    //returns a dynamic temporary score (could change because history) before commiting when clicking restart
    const displayScore = {
    X: score.X + (gameResult.status === 'win' && gameResult.winner === 'X' ? 1 : 0),
    O: score.O + (gameResult.status === 'win' && gameResult.winner === 'O' ? 1 : 0),
    Tie: score.Tie + (gameResult.status === 'tie' ? 1 : 0),
};

    return (
        <div className="flex flex-row justify-between p-8 gap-4 h-screen w-full">
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                <ScoreBoard score={displayScore} handleResetScore={handleResetScore}/>
                <Gamemode aiPlayer={aiPlayer} setAiPlayer={setAiPlayer} handleRestart={handleRestart}/>
            </div>
            <div className="flex-none flex flex-col justify-between">
                <div className="flex justify-center items-center">
                    {gameResult.status === "onGoing" && <h2 className="text-5xl font-bold flex justify-center items-center">{xTurn ? 'X' : 'O'}'s turn</h2>}
                    {gameResult.status === "win" && <h2 className="text-5xl text-green-500 font-bold flex justify-center items-center">{gameResult.winner} is the Winner</h2>}
                    {gameResult.status === "tie" && <h2 className="text-5xl font-bold flex justify-center items-center">It is a Tie</h2>}
                </div>
                <Board board={board} handleClick={handleClickSquare} gameResult={gameResult} aiTurn={aiTurn}/>
                <div className="flex justify-center items-center">
                    <button onClick={handleRestart} className={`text-4xl text-neutral-700 font-bold cursor-pointer border-4 border-neutral-600 px-2 py-1 bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg
                        ${gameResult.status === "onGoing" ? "invisible" : "visible"}`}>Restart
                    </button>
                </div>
            </div>

            <HistoryDisplay history={history} handleCurrIndex={handleCurrIndex} aiPlayer={aiPlayer}/>
        </div>
    );
}

export default App