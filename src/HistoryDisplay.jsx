export default function HistoryDisplay({history,handleCurrIndex}){
    return(
        <ul className="flex flex-col items-center">
            {history.map((board,index)=>{return index > 0 && <li key={index}><button onClick={()=>{handleCurrIndex(index)}} className="text-xl text-neutral-700 font-bold cursor-pointer border-2 border-neutral-600 px-2 py-1 mb-2 bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg">
                Move #{index}
            </button></li>})}
        </ul>
    );
}