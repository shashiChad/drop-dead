import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import '../GameScreen.css';
import character from "../../assets/images/character.png";
import Cartoon from "../../assets/images/Cartoon.png";
import treasure from "../../assets/images/treasure.png";

// Question Data
const questions = [
  { question: 'Longest Bone in Human Body?', options: ['THE STAPES', 'THE FEMUR'], correct: 'THE FEMUR' },
  { question: 'Largest Planet in Solar System?', options: ['EARTH', 'JUPITER'], correct: 'JUPITER' },
  { question: 'Fastest Land Animal?', options: ['LION', 'CHEETAH'], correct: 'CHEETAH' }
];

const GameScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswerCorrect(isCorrect);

    setTimeout(() => {
      setIsAnswerCorrect(null); // Reset animation state
      if (isCorrect) {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
        } else {
          alert('Game Over! You finished all questions.');
        }
      }
    }, 2000);
  };

  return (
    <div className="game-screen">
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
        <div
          className={`character ${
            isAnswerCorrect === true
              ? 'correct'
              : isAnswerCorrect === false
              ? 'wrong'
              : ''
          }`}
        >
          <img src={character} alt="Character" />
        </div>
        <div
          className={`treasure ${
            isAnswerCorrect === true ? 'open' : ''
          }`}
        >
          <img src={treasure} alt="Treasure" />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
