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
    <div className="question-card">
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
      <div className="question-buttons">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option === correctAnswer)}
            className={`btn ${
              option === correctAnswer ? 'correct-btn' : 'wrong-btn'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
