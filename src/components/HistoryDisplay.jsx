export default function HistoryDisplay({history, handleCurrIndex, aiPlayer}){
    return(
        <ul className="flex-1 pt-24 flex flex-col items-center">
            {history.map((_,index)=>{
                //dont show the first index
                if (index === 0) return null

                //show all if there isnt an aiPlayer, or if there is, only show human turn index 
                const shouldDisplay = aiPlayer === null || (aiPlayer === 'X' ? index % 2 !== 0 : index % 2 === 0)
                if (!shouldDisplay) return null

                const displayIndex = aiPlayer === null ? index : aiPlayer === 'X' ? (index+1)/2 : index/2

                return <li key={index}><button onClick={()=>{handleCurrIndex(index)}} className="text-xl text-neutral-700 font-bold cursor-pointer border-2 border-neutral-600 px-2 py-1 mb-2 bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg">
                Move #{displayIndex}
            </button></li>})}
        </ul>
    );
}
