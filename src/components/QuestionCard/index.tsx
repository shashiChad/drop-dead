import React, { useState, useEffect } from 'react';
import '../QuestionCard.css';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
}) => {
  const [droppedOption, setDroppedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Reset state whenever a new question is loaded
    setDroppedOption(null);
    setIsAnswerCorrect(null);
  }, [question]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, option: string) => {
    e.preventDefault();
    const isCorrect = option === correctAnswer;
    setDroppedOption(option);
    setIsAnswerCorrect(isCorrect);
    onAnswer(isCorrect);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="quiz-container">
      {/* Option above */}
      {!droppedOption || droppedOption === options[0] ? (
        <div
          className={`option option-above ${
            droppedOption === options[0] ? 'highlighted' : ''
          }`}
          onDrop={(e) => handleDrop(e, options[0])}
          onDragOver={handleDragOver}
        >
          {options[0]}
        </div>
      ) : null}

      {/* Draggable question */}
      <div
        className={`question ${
          isAnswerCorrect === true
            ? 'correct'
            : isAnswerCorrect === false
            ? 'wrong'
            : ''
        }`}
        draggable={!droppedOption}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', 'dragging');
        }}
        style={{
          position: droppedOption ? 'absolute' : 'relative',
          top:
            droppedOption === options[0]
              ? '30%'
              : droppedOption === options[1]
              ? '70%'
              : 'auto',
          transform: droppedOption ? 'translateY(-50%)' : 'none',
        }}
      >
        {question}
      </div>

      {/* Option below */}
      {!droppedOption || droppedOption === options[1] ? (
        <div
          className={`option option-below ${
            droppedOption === options[1] ? 'highlighted' : ''
          }`}
          onDrop={(e) => handleDrop(e, options[1])}
          onDragOver={handleDragOver}
        >
          {options[1]}
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
