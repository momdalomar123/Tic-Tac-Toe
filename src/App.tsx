import { useState } from 'react'
import { Route,Routes } from 'react-router'
import MainScreen from './Components/MainScreen'
import './App.css'

function App() {
     const [sign,setSign]=useState("X")
     const [computerSign,setComputerSign]=useState("O")
     
    
     console.log(computerSign)
  return(
    <>
    <Routes>
    <Route index element={
    <MainScreen
    sign={sign}
    setSign={setSign}
    computerSign={computerSign}
    setComputerSign={setComputerSign}/>}/>
    
    </Routes>
    </>
  )
}

export default App
