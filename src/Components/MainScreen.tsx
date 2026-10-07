import Header from "./Header";
import GridButtons from "./GridsButtons";
import { useState } from "react";
type Sign = {
  sign: string;
  setSign:(value:string)=>void
  computerSign:string
  setComputerSign:(value:string)=>void
};

export default function MainScreen({sign,setSign,computerSign,setComputerSign}:Sign) {
 const [winning,setWinning]=useState(false)
 const [losing,setLosing]=useState(false)
 const [playerScore,setPlayerScore] = useState(localStorage.getItem("playerScore") ? Number(localStorage.getItem("playerScore"))
 :0)
 const [computerScore,setComputerScore] = useState(localStorage.getItem("computerScore") ? Number(localStorage.getItem("computerScore")):0)

   const [signButtonsOn, setSignButtonsOn] = useState(Array(9).fill(false));
    const [movesArray,setMovesArray]=useState<(string|number)[]>([...Array(9)].map((_,i)=>{return i+1}));

   
  return (
    <>
      <Header 
      sign={sign}
      setSign={setSign}
      winning={winning}
      setWinning={setWinning} 
      computerSign={computerSign}
      setComputerSign={setComputerSign}
      signButtonsOn={signButtonsOn}
      setSignButtonsOn={setSignButtonsOn}
      movesArray={movesArray}
      setMovesArray={setMovesArray}
      losing={losing}
      setLosing={setLosing}
      computerScore={computerScore}
      playerScore={playerScore}/>
      <div className="flex mt-20 justify-center items-center h-120  ">
        <GridButtons 
        sign={sign}
        setSign={setSign}
        computerSign={computerSign}
        setComputerSign={setComputerSign}
        winning={winning}
        setWinning={setWinning}
        signButtonsOn={signButtonsOn} 
        setSignButtonsOn={setSignButtonsOn}
        movesArray={movesArray}
        setMovesArray={setMovesArray}
        losing={losing}
        setLosing={setLosing}
        computerScore={computerScore}
        setComputerScore={setComputerScore}
        playerScore={playerScore}
        setPlayerScore={setPlayerScore}
        />
      
      </div>
      
    </>
  );
}
