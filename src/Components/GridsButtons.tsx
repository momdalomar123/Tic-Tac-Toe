import { useState } from "react";
import RenderSign from "./RenderSign";
type SignWinningState = {
  sign: string;
  setSign: (value: string) => void;
  computerSign: string;
  setComputerSign: (value: string) => void;
  winning: boolean;
  setWinning: (value: boolean) => void;
  signButtonsOn: boolean[];
  setSignButtonsOn: (value: boolean[]) => void;
};
type IsLosing = {
  losing: boolean;
  setLosing: (value: boolean) => void;
};
type Moves = {
  movesArray: (number | string)[];
  setMovesArray: (value: (number | string)[]) => void;
};
type SignWinningStateMoves = SignWinningState & IsLosing & Moves;
function getRandomIndex(legalMoves: (number | string)[]) {
  return Math.floor(Math.random() * legalMoves.length);
}

export default function GridButtons({
  sign,
  computerSign,
  setComputerSign,
  winning,
  setWinning,
  signButtonsOn,
  setSignButtonsOn,
  movesArray,
  setMovesArray,
  setLosing,
  losing,
}: SignWinningStateMoves) {
  void setComputerSign;
  const [computerPlaying, setComputerPlaying] = useState(false);

  function playSign(event: React.MouseEvent<HTMLButtonElement>, sign: string) {
    const playedIndex = Number(event.currentTarget.id);
    console.log(event.currentTarget.id);
    const newSignButtonsOn = [...signButtonsOn];
    newSignButtonsOn[playedIndex - 1] = !newSignButtonsOn[playedIndex - 1];
    setSignButtonsOn(newSignButtonsOn);
    const newMoves = [...movesArray];
    newMoves[playedIndex - 1] = sign;
    setMovesArray(newMoves);
    if (checkUserWinning(newMoves, sign)) return;

    setTimeout(() => {
      setComputerPlaying(!computerPlaying);
      playComputer(newMoves, newSignButtonsOn);
    }, 1000);
  }
  function checkLegalMoves(movesArray: (number | string)[]) {
    const legalMoves = movesArray.filter((id) => {
      if (typeof id === "number") {
        console.log(id);
        return id;
      }
    });
    return legalMoves;
  }
  function playComputer(
    movesArray: (number | string)[],
    newSignButtonsOn: boolean[],
  ) {
    const legalMoves = checkLegalMoves(movesArray);

    const randomIndex = getRandomIndex(legalMoves);

    const randomMove: number = Number(legalMoves[randomIndex]);
    const newArray = [...movesArray];
    newArray[randomMove - 1] = computerSign;
    setMovesArray(newArray);
    console.log(newArray);
    const newSignButtonsOnComputer = [...newSignButtonsOn];
    newSignButtonsOnComputer[randomMove - 1] =
      !newSignButtonsOnComputer[randomMove - 1];
    setSignButtonsOn(newSignButtonsOnComputer);
    checkComputerWinning(newArray, computerSign);
  }
  function checkUserWinning(movesArray: (number | string)[], sign: string) {
    if (winningCaseOne(movesArray, sign)) {
      setWinning(true);
      return true;
    } else if (winningCaseTwo(movesArray, sign)) {
      setWinning(true);
      return true;
    } else if (winningCaseThree(movesArray, sign)) {
      setWinning(true);
      return true;
    } else if (winningCaseFour(movesArray, sign)) {
      setWinning(true);
      return true;
    }
  }
  function checkComputerWinning(movesArray: (number | string)[], sign: string) {
    if (winningCaseOne(movesArray, sign)) setLosing(true);
    else if (winningCaseTwo(movesArray, sign)) setLosing(true);
    else if (winningCaseThree(movesArray, sign)) setLosing(true);
    else if (winningCaseFour(movesArray, sign)) setLosing(true);
  }

  function winningCaseOne(movesArray: (number | string)[], sign: string) {
    let signCount = 0;
    for (let i = 0; i < 3; i++) {
      if (movesArray[i] === sign) {
        signCount += 1;
        console.log(signCount);
      }
      console.log(sign);

      if (signCount === 3) return true;
    }
    signCount = 0;
    for (let i = 3; i < 6; i++) {
      if (movesArray[i] === sign) {
        signCount += 1;
      }
      if (signCount == 3) return true;
    }
    signCount = 0;
    for (let i = 6; i < 9; i++) {
      if (movesArray[i] === sign) {
        signCount += 1;
      }
      if (signCount == 3) return true;
    }
    return false;
  }
  function winningCaseTwo(movesArray: (number | string)[], sign: string) {
    if (
      movesArray[0] === sign &&
      movesArray[3] === sign &&
      movesArray[6] === sign
    )
      return true;
    else if (
      movesArray[1] === sign &&
      movesArray[4] === sign &&
      movesArray[7] === sign
    )
      return true;
    else if (
      movesArray[2] === sign &&
      movesArray[5] === sign &&
      movesArray[8] === sign
    )
      return true;
  }
  function winningCaseThree(movesArray: (number | string)[], sign: string) {
    if (
      movesArray[0] === sign &&
      movesArray[4] === sign &&
      movesArray[8] === sign
    ) {
      return true;
    }

    return false;
  }
  function winningCaseFour(movesArray: (number | string)[], sign: string) {
    if (
      movesArray[2] === sign &&
      movesArray[4] === sign &&
      movesArray[6] === sign
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 text-white text-3xl animate-popOut">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="bg-blue-400 w-32 h-32 shadow-[10px_7px_0_1px_rgba(0,100,255,0.5)] transition-all hover:bg-blue-500 hover:text-blue-200 rounded-2xl hover:shadow-[10px_7px_0_1px_rgba(0,70,255,0.5)] active:translate-2 active:shadow-none animate-popOut"
        >
          <button
            className="w-full h-full cursor-pointer flex justify-center items-center"
            id={String(i + 1)}
            disabled={signButtonsOn[i] || winning || losing}
            onClick={async (event) => {
              await playSign(event, sign);
            }}
          >
            {signButtonsOn[i] == true ? (
              <RenderSign sign={String(movesArray[i])} />
            ) : (
              i + 1
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
