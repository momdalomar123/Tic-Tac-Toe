type ButtonsAndArray={
  signButtonsOn:boolean[]
setSignButtonsOn:(value:boolean[])=>void
movesArray:(number|string)[]
setMovesArray:(value:(number|string)[])=>void
}
export default function Draw({signButtonsOn,setSignButtonsOn,movesArray,setMovesArray}:ButtonsAndArray) {
  function playAgain(){
    signButtonsOn.forEach(()=>{setSignButtonsOn([false])})
    console.log(movesArray)
    const resetMoves:(number|string)[]=[1,2,3,4,5,6,7,8,9]
    setMovesArray(resetMoves)

  }
  return (
    <>
      <div className="flex justify-center items-center gap-5 mt-2">
        <p className="text-white text-2xl">It's a Draw !</p>
        
        <button className="bg-amber-300 px-4 rounded-md pt-2 pb-2 cursor-pointer shadow-[10px_7px_0_1px_rgba(150,120,0,0.5)]  transition-all hover:bg-amber-400 hover:shadow-[10px_7px_0_1px_rgba(150,100,0,0.5)] active:translate-2 active:shadow-none" onClick={()=>{playAgain()}}>
          play Again
        </button>
        
      </div>
    </>
  );
}
