import React from 'react'
import character1 from "../../Resources/images/character1.png";
import treasure1 from "../../Resources/images/treasure1.png";
import { useNavigate } from 'react-router-dom';
import downarrow from "../../Resources/images/downarrow.png";
import uparrow from "../../Resources/images/uparrow.png";
const TutorialScreen: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
 navigate("/game");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="w-80 h-screen bg-gray-600 flex flex-col items-center justify-around py-8 text-white">
            <h1 className="text-3xl font-bold uppercase">Tutorials</h1>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                 <img src={uparrow} alt="arrow" />
              </div>
            </div>
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                Question ??
            </div>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                 <img src={downarrow} alt="arrow" />
              </div>
            </div>
            <p className="text-center text-sm px-4">
              Move the question towards the right answer using the up and down keypad
            </p>
            <div className="flex justify-between w-full px-6">
              <img 
              src={character1} 
              alt="warrior"
              className="w-16 h-16 object-contain"
               />
               <img 
              src={treasure1} 
              alt="treasure"
              className="w-16 h-16 object-contain"
               />
            </div>
            <button
            onClick={startGame}
            className="px-6 py-3 text-2xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
            >
            Start Game
            </button>
        </div>
    </div>
  );
};

export default TutorialScreen;
