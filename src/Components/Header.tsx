import Winning from "./Winning";
import SignSelect from "./SignSelect";
import Losing from "../Components/Losing";
import Draw from "./Draw";
type SignWinningLosingState = {
  sign: string;
  setSign: (value: string) => void;
  computerSign: string;
  setComputerSign: (value: string) => void;
  winning: boolean;
  setWinning: (value: boolean) => void;
  losing: boolean;
  setLosing: (value: boolean) => void;
  signButtonsOn: boolean[];
  setSignButtonsOn: (value: boolean[]) => void;
  movesArray: (number | string)[];
  setMovesArray: (value: (number | string)[]) => void;
  computerScore: number;
  playerScore: number;
};

export default function Header({
  sign,
  setSign,
  computerSign,
  setComputerSign,
  winning,
  setWinning,
  losing,
  setLosing,
  signButtonsOn,
  setSignButtonsOn,
  movesArray,
  setMovesArray,
  playerScore,
  computerScore,
}: SignWinningLosingState) {
  void setWinning;
  function checkMovesString() {
    let numberFlag = false;
    console.log(movesArray);
    movesArray.forEach((move) => {
      if (typeof move === "number") {
        console.log(move);
        numberFlag = true;
      }
    });
    if (!numberFlag) return true;
    return false;
  }

  return (
    <>
      <div className="text-3xl text-white flex justify-center items-center h-20 text-shadow-white flex-col animate-popOut">
        <p className="flex mt-15 ">Tic-Tac-Toe</p>
        <div className="flex justify-center items-center gap-5 w-full max-[522px]:text-2xl max-[450px]:text-[20px] max-[385px]:text-[17px]">
          <div className="flex gap-2 ml-10  ">
            <div>Player Score:</div> <div>{playerScore}</div>
          </div>
          <div className="border border-white h-7 "></div>
          <div className="flex gap-2">
            <div>Computer Score:</div>
            <div>{computerScore}</div>
          </div>
        </div>

        {winning === true ? (
          <Winning
            winning={winning}
            setWinning={setWinning}
            signButtonsOn={signButtonsOn}
            setSignButtonsOn={setSignButtonsOn}
            movesArray={movesArray}
            setMovesArray={setMovesArray}
          />
        ) : losing === true ? (
          <Losing
            losing={losing}
            setLosing={setLosing}
            signButtonsOn={signButtonsOn}
            setSignButtonsOn={setSignButtonsOn}
            movesArray={movesArray}
            setMovesArray={setMovesArray}
          />
        ) : checkMovesString() ? (
          <Draw
            signButtonsOn={signButtonsOn}
            setSignButtonsOn={setSignButtonsOn}
            movesArray={movesArray}
            setMovesArray={setMovesArray}
          />
        ) : (
          <SignSelect
            sign={sign}
            setSign={setSign}
            computerSign={computerSign}
            setComputerSign={setComputerSign}
          />
        )}
      </div>
    </>
  );
}
