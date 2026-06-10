import { useEffect, useState } from "react";

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xTurn, setXTurn] = useState(true)
    const [score, setScore] = useState(()=>
        JSON.parse(localStorage.getItem('score')) ?? { X: 0, O: 0, Tie: 0 }
    )

    useEffect(()=>{
        localStorage.setItem('score', JSON.stringify(score))
    },[score])

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

        //if winner
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

    let gameResult = checkWin(board)

    const handleClick = (index) => {
        if (board[index] !== null || gameResult.status !== 'onGoing') return;
        let newBoard = [...board]
        newBoard[index] = xTurn ? 'X' : 'O'
        setBoard(newBoard)
        setXTurn(!xTurn)

        const nextResult = checkWin(newBoard)
        if (nextResult.status === 'win'){
            setScore(prevScore => ({
                ...prevScore,
                [nextResult.winner]: prevScore[nextResult.winner] + 1
            }))
        } else if (nextResult.status === 'tie') {
            setScore(prevScore => ({
                ...prevScore,
                Tie: prevScore.Tie + 1
            }))
        }
    };

    return (
        <div className="grid grid-rows-[20%_60%_20%] grid-cols-[30%_40%_30%] h-screen w-screen">
            <div className="col-span-3 flex justify-center items-center">
                {gameResult.status === "onGoing" && <h2 className="text-5xl font-bold flex justify-center items-center">{xTurn ? 'X' : 'O'}'s turn</h2>}
                {gameResult.status === "win" && <h2 className="text-5xl text-green-500 font-bold flex justify-center items-center">{gameResult.winner} is the Winner</h2>}
                {gameResult.status === "tie" && <h2 className="text-5xl font-bold flex justify-center items-center">It is a Tie</h2>}
            </div>
            <div className="flex flex-col justify-center items-center bg-neutral-200 p-4">
                <h3 className="text-4xl font-bold">Score</h3>
                <p className="text-3xl">X: {score.X}</p>
                <p className="text-3xl">O: {score.O}</p>
                <p className="text-3xl">Tie: {score.Tie}</p>
            </div>
            <div className="flex justify-center items-center">
                <Board board={board} handleClick={handleClick} gameResult={gameResult}/>
            </div>
            <div></div>
            <div className="col-span-3 flex justify-center items-center">
                {gameResult.status !== "onGoing" && <button onClick={()=>{setBoard(Array(9).fill(null))}} className="text-5xl font-bold flex justify-center items-center cursor-pointer border-4 px-2 py-1 hover:bg-neutral-100 active:bg-neutral-200 rounded-xl">Restart</button>}
            </div>
        </div>
    );
}

export default App

function Board({board,handleClick,gameResult}){
    return (
        <div className="grid grid-cols-3">
            {console.log(gameResult)}
            {board.map((square, index)=> <Square key={index} value={square} disabled={square !== null || gameResult.status !=='onGoing'} winner={gameResult.status ==='win' && gameResult.pos.includes(index)} onClick= {() => {handleClick(index)}}/>)}
        </div>
    );
}


function Square({value,disabled,winner,onClick}){
    return <div onClick={onClick} className={`border-3 w-32 h-32 text-8xl flex items-center justify-center select-none font-bold ${disabled || 'cursor-pointer hover:bg-neutral-200'} ${winner && 'text-green-500'}`} >{value !== null && value}</div>
}