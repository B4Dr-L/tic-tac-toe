export default function ScoreBoard({score,handleResetScore}){
    return (
    <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-5xl font-bold">Score:</h3>
        <p className="text-3xl font-semibold">X: {score.X}</p>
        <p className="text-3xl font-semibold">O: {score.O}</p>
        <p className="text-3xl font-semibold">Tie: {score.Tie}</p>
        <button onClick={handleResetScore} className="text-2xl text-neutral-700 font-bold cursor-pointer border-4 border-neutral-600 px-3 py-1 bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg">Reset</button>
    </div>
    );
}