import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import StartScreen from './components/StartScreen'
import TutorialScreen from './components/TutorialScreen';
import GameScreen from './components/GameScreen'

const App: React.FC = () => {
 return (
   <Routes>
    <Route path="/" element ={<StartScreen/>}/>
    <Route path="/tutorial" element={<TutorialScreen/>}/>
    <Route path="/game" element={<GameScreen/>}/>
   </Routes>
  );
}

export default App