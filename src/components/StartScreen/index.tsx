import React from "react";
import Cartoon from "../../assets/images/Cartoon.png";
import character1 from "../../assets/images/character1.png";
import treasure1 from "../../assets/images/treasure1.png";
import { useNavigate } from "react-router-dom";
const StartScreen: React.FC = () => {
  const navigate = useNavigate();
  
    const start = () => {
   navigate("/tutorial");
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-80 h-screen bg-sky-200 flex flex-col items-center justify-around py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-600 uppercase drop-shadow-md">
          Drop Dead
        </h1>

        {/* Viking Image */}
        <img
          src={Cartoon}
          alt="Viking Head"
          className="w-42 h-42 object-contain"
        />

        {/* Start Button */}
        <button
          onClick={start}
          className="px-6 py-3 text-2xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
        >
          START
        </button>

        {/* Bottom Viking Warrior and Chest */}
        <div className="flex justify-between w-full px-6">
          <img
            src={character1}
            alt="Warrior"
            className="w-16 h-16 object-contain"
          />
          <img 
          src={treasure1}
          alt="treasure"
          className="w-16 h-16 object-contain"
          
          />
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
