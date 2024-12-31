import React from 'react';
import '../QuestionCard.css';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  isAnswerCorrect: boolean | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  isAnswerCorrect,
}) => {
  return (
    <div className="question-card flex items-center justify-center">
      <div className="option-side flex flex-col">
        <button
          onClick={() => onAnswer(options[0] === correctAnswer)}
          className={`btn ${options[0] === correctAnswer ? 'correct-btn' : 'wrong-btn'}`}
        >
          {options[0]}
        </button>
      </div>
      <div
        className={`question-circle ${
          isAnswerCorrect === true
            ? 'correct'
            : isAnswerCorrect === false
            ? 'wrong'
            : ''
        }`}
      >
        <p>{question}</p>
      </div>
      <div className="option-side flex flex-col">
        <button
          onClick={() => onAnswer(options[1] === correctAnswer)}
          className={`btn ${options[1] === correctAnswer ? 'correct-btn' : 'wrong-btn'}`}
        >
          {options[1]}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
