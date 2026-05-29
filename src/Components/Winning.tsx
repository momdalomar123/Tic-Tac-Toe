type Winning = {
  winning: boolean;
  setWinning: (value: boolean) => void;
  signButtonsOn: boolean[];
  setSignButtonsOn: (value: boolean[]) => void;
  movesArray: (number | string)[];
  setMovesArray: (value: (number | string)[]) => void;
};
export default function Winning({
  winning,
  setWinning,
  signButtonsOn,
  setSignButtonsOn,
  movesArray,
  setMovesArray,
}: Winning) {
  function playAgain() {
    console.log(winning);
    setWinning(false);
    signButtonsOn.forEach(() => {
      setSignButtonsOn([false]);
    });
    console.log(movesArray);
    const resetMoves: (number | string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setMovesArray(resetMoves);
  }
  return (
    <>
      <div className="flex justify-center items-center gap-5 mt-2">
        <p className="text-white text-3xl font-Bricolage">You Won !</p>

        <button
          className="bg-green-500 px-4 rounded-md pt-2 pb-2 cursor-pointer shadow-[10px_7px_0_1px_rgba(0,120,0,0.5)]  transition-all hover:bg-green-600 hover:shadow-[10px_7px_0_1px_rgba(0,100,0,0.5)] active:translate-2 active:shadow-none"
          onClick={() => {
            playAgain();
          }}
        >
          play Again
        </button>
      </div>
    </>
  );
}
