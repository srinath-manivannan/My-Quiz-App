import React, { useMemo } from 'react';
// import { Question } from '../../types/quiz.types';
import { getOptionLetter } from '../../utils/helpers';
import type { Question } from '../../types/quiz.types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedOption: number | undefined;
  onSelectOption: (optionIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  selectedOption,
  onSelectOption,
}) => {
  const options = useMemo(() => question.options, [question.options]);

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Question {questionNumber}</span>
        {question.category && (
          <span className="question-category">{question.category}</span>
        )}
      </div>
      
      <h2 className="question-text">{question.question}</h2>

      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => onSelectOption(index)}
          >
            <span className="option-letter">{getOptionLetter(index)}</span>
            <span className="option-text">{option}</span>
            {selectedOption === index && (
              <span className="option-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};