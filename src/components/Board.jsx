export default function Board({board,handleClick,gameResult,aiTurn}){
    return (
        <div className="flex justify-center items-center w-full max-w-sm sm:max-w-md mx-auto aspect-square">
            <div className="grid grid-cols-3">
                {board.map((square, index)=> <Square key={index} value={square} disabled={square !== null || gameResult.status !=='onGoing' || aiTurn} winner={gameResult.status ==='win' && gameResult.pos.includes(index)} onClick= {() => {handleClick(index)}}/>)}
            </div>
        </div>
    );
}


function Square({value,disabled,winner,onClick}){
    return <button onClick={onClick} className={`border-3 w-32 h-32 text-8xl flex items-center justify-center select-none font-bold ${disabled || 'cursor-pointer hover:bg-neutral-200'} ${winner && 'text-green-500'}`} >{value !== null && value}</button>
}