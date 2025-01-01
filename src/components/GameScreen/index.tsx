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
import treasure3 from "../../assets/images/treasure3.png";
import coin from "../../assets/images/coin.png";
import back from "../../assets/images/back.png";

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
  const [showCoin, setShowCoin] = useState(false);

  const characterImages = [character1, character2, character3, character4, character5];
  const animationDuration = 5000;

  // Track the current question status correctly
  useEffect(() => {
    let interval: number | null = null;

    // Ensure isAnswerCorrect is available for interval logic
    if (isAnswerCorrect !== null) {
      interval = window.setInterval(() => {
        setCurrentCharacter((prev) => {
          const nextIndex = prev + 1;

          if (nextIndex === characterImages.length - 1) {
            setTreasureImage(isAnswerCorrect ? treasure3 : treasure2);
            setShowCoin(isAnswerCorrect);
          }

          if (nextIndex >= characterImages.length) {
            clearInterval(interval as number); // Proper clearing of interval
            return prev;
          }

          return nextIndex;
        });
      }, animationDuration / characterImages.length);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval); // Ensure clearing interval on cleanup
      }
    };
  }, [isAnswerCorrect]);

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswerCorrect(isCorrect);

    // Timeout logic to reset everything after the animation duration
    setTimeout(() => {
      setIsAnswerCorrect(null); // Reset the answer state
      setTreasureImage(treasure1); // Reset treasure image
      setShowCoin(false); // Hide the coin
      setCurrentCharacter(0); // Reset character animation

      // Move to the next question if it's correct
      if (isCorrect && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, animationDuration + 2000); // After animation duration
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
          isAnswerCorrect={isAnswerCorrect} // Pass isAnswerCorrect to the QuestionCard
        />
      </div>

      <div className="game-bottom relative bottom-0">
        <img src={back} alt="background" className="w-screen" />
        <div className="flex">
          <img
            src={characterImages[currentCharacter]}
            alt="Character"
            className="relative bottom-60 h-60 w-52 z-20"
          />
          <img
            src={treasureImage}
            alt="Treasure"
            className="relative h-60 bottom-60 -right-5 z-0"
          />
          {showCoin && (
            <img
              src={coin}
              alt="Coin"
              className="absolute bottom-52 right-10 h-20 w-20 z-30"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
