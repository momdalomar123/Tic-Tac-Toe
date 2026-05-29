
type Sign = {
  sign: string;
  setSign:(value:string)=>void
  computerSign:string
  setComputerSign:(value:string)=>void
  
};
export default function SignSelect({sign,setSign,computerSign,setComputerSign}:Sign){
     function crossSign(){
    console.log(sign)
    console.log(computerSign)
    setSign("X")
    setComputerSign("O")
  }
  function circleSign(){
    setSign("O")
    setComputerSign("X")
  }
    return(
        <div className="flex gap-4 mt-2">
          <button className="bg-emerald-400 px-4 rounded-md pt-2 pb-2 cursor-pointer shadow-[10px_7px_0_1px_rgba(100,255,150,0.5)]  transition-all hover:bg-emerald-500 hover:shadow-[10px_7px_0_1px_rgba(80,255,170,0.5)] active:translate-2 active:shadow-none " onClick={()=>{crossSign()}}>
            Cross X
          </button>
          <button className="bg-emerald-400 px-4 rounded-md pt-2 pb-2 cursor-pointer shadow-[10px_7px_0_1px_rgba(100,255,150,0.5)]  transition-all hover:bg-emerald-500 hover:shadow-[10px_7px_0_1px_rgba(80,255,170,0.5)] active:translate-2 active:shadow-none" onClick={()=>{circleSign()}}>
            Circle O
          </button>
          
        </div>
    );
}