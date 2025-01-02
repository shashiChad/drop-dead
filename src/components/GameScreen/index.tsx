import React, { useState, useEffect } from 'react';
import QuestionCard from '../QuestionCard';
import '../GameScreen.css';
import character1 from "../../assets/images/character1.png";
import character2 from "../../assets/images/character2.png";
import character3 from "../../assets/images/character3.png";
import character4 from "../../assets/images/character4.png";
import character5 from "../../assets/images/character5.png";
import Cartoon from "../../assets/images/Cartoon.png";
import treasure1 from "../../assets/images/treasure1.png";
import treasure2 from "../../assets/images/treasure2.png";
import treasure3 from "../../assets/images/treasure3.png"; // New Treasure
import coin from "../../assets/images/coin.png"; // Coin Image
import back from "../../assets/images/back.png";

// Question Data
const questions = [
  { question: 'Longest Bone in Human Body?', options: ['THE STAPES', 'THE FEMUR'], correct: 'THE FEMUR' },
  { question: 'Largest Planet in Solar System?', options: ['EARTH', 'JUPITER'], correct: 'JUPITER' },
  { question: 'Fastest Land Animal?', options: ['LION', 'CHEETAH'], correct: 'CHEETAH' },
];

const GameScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [treasureImage, setTreasureImage] = useState(treasure1);
  const [showCoin, setShowCoin] = useState(false); // New state for coin visibility

  const characterImages = [character1, character2, character3, character4, character5];
  const animationDuration = 5000; // Total animation duration in milliseconds
  const timePerImage = animationDuration / characterImages.length; // Time to display each character image

  useEffect(() => {
    let interval: number | null = null;
  
    if (isAnswerCorrect !== null) {
      interval = window.setInterval(() => {
        setCurrentCharacter((prev) => {
          const nextIndex = prev + 1;
  
          // Trigger events when character reaches specific stages
          if (nextIndex === Math.floor(characterImages.length * 0.7)) {
            setTreasureImage(treasure1); // Treasure transitions to treasure1 at 70%
          }
  
          if (nextIndex === characterImages.length) {
            setTreasureImage(treasure2); // Treasure transitions to treasure2 at 95%
          }
  
          if (nextIndex === characterImages.length) {
            setTimeout(() => {
              setTreasureImage(treasure3); // Treasure transitions to treasure3
              if(isAnswerCorrect){
                setShowCoin(true); // Coin appears only if the answer is correct
              }
            }, 1000); // Delay of 1 second after reaching 95%
          }
  
          // Stop animation at `character5`
          if (nextIndex >= characterImages.length) {
            window.clearInterval(interval as number);
            return characterImages.length - 1; // Stop at `character5`
          }
  
          return nextIndex;
        });
      }, timePerImage);
    }
  
    return () => {
      if (interval !== null) window.clearInterval(interval);
    };
  }, [isAnswerCorrect]);
  


  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswerCorrect(isCorrect);
  
    // Reset states after animation and hold
    setTimeout(() => {
      setIsAnswerCorrect(null);
      setTreasureImage(treasure1); // Reset treasure to closed
      setShowCoin(false); // Hide coin
      setCurrentCharacter(0); // Reset character animation
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      } else {
        alert('Game Over! You finished all questions.');
      }
    }, animationDuration + 3000); // Animation duration + 3-second hold
  };
  

  return (
    <div className="game-screen h-screen">
      <div className="game-header">
        <img src={Cartoon} alt="Logo" className="logo" />
      </div>

      <div className="game-question">
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          correctAnswer={questions[currentQuestionIndex].correct}
          onAnswer={handleAnswer}
          isAnswerCorrect={isAnswerCorrect}
        />
      </div>

      <div className="game-bottom">
        <img src={back} alt="background" className="w-screen" />
        <div className="flex">
          <div
            className={`character ${
              isAnswerCorrect === true
                ? 'correct'
                : isAnswerCorrect === false
                ? 'wrong'
                : ''
            }`}
          >
            <img
              src={characterImages[currentCharacter]}
              alt="Character"
              className="relative bottom-60 h-60 w-52 z-20"
            />
          </div>
          <div
            className={`treasure ${
              isAnswerCorrect === true ? 'open' : ''
            }`}
          >
            <img src={treasureImage} alt="Treasure" className="relative h-60 bottom-60 -right-5 z-0" />
            {showCoin && (
              <img
                src={coin}
                alt="Coin"
                className="absolute bottom-52 right-10 transform -translate-x-1/2 h-20 w-20 z-30"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;