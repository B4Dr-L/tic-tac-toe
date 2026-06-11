export default function Gamemode({aiPlayer,setAiPlayer,handleRestart}){
    return(
    <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-4xl font-bold">Gamemode</h3>
        <div className="flex flex-col gap-4 items-start -ml-4">
            <label className="flex items-center gap-4 text-2xl font-semibold cursor-pointer">
                <input
                    type="radio"
                    name="gameMode"
                    checked={aiPlayer === null}
                    onChange={() => {
                        setAiPlayer(null);
                        handleRestart();
                    }}
                    className="w-5 h-5 cursor-pointer accent-neutral-800"
                />
                vs Player
            </label>

            <label className="flex items-center gap-4 text-2xl font-semibold cursor-pointer">
                <input
                    type="radio"
                    name="gameMode"
                    checked={aiPlayer === 'X'}
                    onChange={() => {
                        setAiPlayer('X');
                        handleRestart();
                    }}
                    className="w-5 h-5 cursor-pointer accent-neutral-800"
                />
                vs AI (X)
            </label>

            <label className="flex items-center gap-4 text-2xl font-semibold cursor-pointer">
                <input
                    type="radio"
                    name="gameMode"
                    checked={aiPlayer === 'O'}
                    onChange={() => {
                        setAiPlayer('O');
                        handleRestart();
                    }}
                    className="w-5 h-5 cursor-pointer accent-neutral-800"
                />
                vs AI (O)
            </label>
        </div>
    </div>);
}