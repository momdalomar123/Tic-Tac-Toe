import CrossIcon from "../assets/Images/cross.png"
import CircleIcon from "../assets/Images/circle.png"

type Sign ={
    sign:string
}
export default function RenderSign({sign}:Sign){
    
  return (
    <img
      src={sign == "X" ? CrossIcon : CircleIcon}
      className="w-20 h-20"
    ></img>
  );

}