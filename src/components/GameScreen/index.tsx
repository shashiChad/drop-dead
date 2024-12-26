import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import { AnimatePresence, motion } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Longest Bone in Human Body?',
    correctAnswer: 'THE FEMUR',
    options: ['THE FEMUR', 'THE SPINE', 'THE SKULL']
  },
  {
    id: 2,
    question: 'What do we call animals that only eat plants?',
    correctAnswer: 'HERBIVORES',
    options: ['CARNIVOROUS', 'HERBIVORES', 'OMNIVORES']
  },
];

const GameScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      } else {
        alert('Game Over! Your score: ${score + (answer === currentQuestion.correctAnswer ? 1 : 0)}');
      }
    }, 1500);
  };

  return (
    <div className="h-screen overflow-hidden">
      <AnimatePresence mode="wait">
         <motion.div
         key={currentQuestion.id}
         initial={{x: '100vw', opacity:0}}
         animate={{ x:0, opacity:1}}
         exit={{x:'-100vw', opacity: 0}}
         transition={{type: 'spring',stiffness:100}}
         className="h-full"
         >
            <QuestionCard
             question={currentQuestion.question}
             options={currentQuestion.options}
             correctAnswer={currentQuestion.correctAnswer}
             selectedAnswer={selectedAnswer}
             onSelectAnswer={handleAnswerSelect}
            />
         </motion.div>
      </AnimatePresence>
      {/*Score Dispaly*/}
      <div className="absolute top-4 right-4 text-xl font-bold">
        Score:{score}
      </div>
    </div>
  );
};

export default GameScreen;
