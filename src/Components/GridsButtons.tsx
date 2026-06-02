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

  async function playSign(
    event: React.MouseEvent<HTMLButtonElement>,
    sign: string,
  ) {
    setComputerPlaying(true);

    const playedIndex = Number(event.currentTarget.id);
    console.log(event.currentTarget.id);
    const newSignButtonsOn = [...signButtonsOn];
    newSignButtonsOn[playedIndex - 1] = !newSignButtonsOn[playedIndex - 1];
    setSignButtonsOn(newSignButtonsOn);
    const newMoves = [...movesArray];
    newMoves[playedIndex - 1] = sign;
    setMovesArray(newMoves);
    if (checkUserWinning(newMoves, sign)) {
      setComputerPlaying(false);
      return;
    }

    let moveIndex: number;
    if (getBestMoveComputer(newMoves))
      moveIndex = Number(getBestMoveComputer(newMoves));
    await setTimeout(() => {
      playComputer(newMoves, newSignButtonsOn, moveIndex);
      setComputerPlaying(false);
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
  function getBestMoveComputer(movesArray: (number | string)[]) {
    let index;
    //Moves to block

    if (bestMoveToBlockUser(movesArray, 0, 3, 1)) {
      index = bestMoveToBlockUser(movesArray, 0, 3, 1);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 3, 6, 1)) {
      index = bestMoveToBlockUser(movesArray, 3, 6, 1);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 6, 9, 1)) {
      index = bestMoveToBlockUser(movesArray, 6, 9, 1);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 0, 7, 3)) {
      index = bestMoveToBlockUser(movesArray, 0, 7, 3);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 1, 8, 3)) {
      index = bestMoveToBlockUser(movesArray, 1, 8, 3);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 2, 9, 3)) {
      index = bestMoveToBlockUser(movesArray, 2, 9, 3);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 0, 9, 4)) {
      index = bestMoveToBlockUser(movesArray, 0, 9, 4);
      return index;
    } else if (bestMoveToBlockUser(movesArray, 2, 7, 2)) {
      index = bestMoveToBlockUser(movesArray, 2, 7, 2);
      return index;
    }

    //Move To Win

    if (bestMoveToWinComputer(movesArray, 0, 3, 1)) {
      index = bestMoveToWinComputer(movesArray, 0, 3, 1);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 3, 6, 1)) {
      index = bestMoveToWinComputer(movesArray, 3, 6, 1);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 6, 9, 1)) {
      index = bestMoveToWinComputer(movesArray, 6, 9, 1);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 0, 7, 3)) {
      index = bestMoveToWinComputer(movesArray, 0, 7, 3);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 1, 8, 3)) {
      index = bestMoveToWinComputer(movesArray, 1, 8, 3);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 2, 9, 3)) {
      index = bestMoveToWinComputer(movesArray, 2, 9, 3);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 0, 9, 4)) {
      index = bestMoveToWinComputer(movesArray, 0, 9, 4);
      return index;
    } else if (bestMoveToWinComputer(movesArray, 2, 7, 2)) {
      index = bestMoveToWinComputer(movesArray, 2, 7, 2);
      return index;
    }
  }
  function bestMoveToBlockUser(
    movesArray: (number | string)[],
    iStart: number,
    iEnd: number,
    step: number,
  ) {
    let count = 0;
    let indexMove;
    for (let i = iStart; i < iEnd; i += step) {
      if (movesArray[i] === sign) count++;
      else if (movesArray[i] != computerSign) indexMove = i;
    }
    if (count === 2) {
      return indexMove;
    } else return 0;
  }
  function bestMoveToWinComputer(
    movesArray: (number | string)[],
    iStart: number,
    iEnd: number,
    step: number,
  ) {
    let count = 0;
    let indexMove;
    for (let i = iStart; i < iEnd; i += step) {
      if (movesArray[i] === computerSign) count++;
      else if (typeof movesArray[i] === "number") indexMove = i;
    }
    if (count >= 1) {
      return indexMove;
    } else return 0;
  }

  function playComputer(
    movesArray: (number | string)[],
    newSignButtonsOn: boolean[],
    moveIndex: number,
  ) {
    const legalMoves = checkLegalMoves(movesArray);

    const randomIndex = getRandomIndex(legalMoves);
    let index;
    if (!getBestMoveComputer(movesArray))
      index = Number(legalMoves[randomIndex]) - 1;
    else index = moveIndex;
    console.log("Index", index);
    const newArray = [...movesArray];
    newArray[index] = computerSign;
    setMovesArray(newArray);
    console.log(newArray);
    const newSignButtonsOnComputer = [...newSignButtonsOn];
    newSignButtonsOnComputer[index] = !newSignButtonsOnComputer[index];
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
            disabled={signButtonsOn[i] || winning || losing || computerPlaying}
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
