import React from 'react';
// import { QuizResult } from '../../types/quiz.types';
import { getOptionLetter } from '../../utils/helpers';
import type { QuizResult } from '../../types/quiz.types';

interface ReviewCardProps {
  result: QuizResult;
  index: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ result, index }) => {
  const { question, options, correctAnswer, userAnswer, isCorrect, explanation } = result;

  return (
    <div className={`review-card ${isCorrect ? 'review-correct' : 'review-incorrect'}`}>
      <div className="review-header">
        <div className="review-number">
          <span>Question {index + 1}</span>
        </div>
        <div className={`review-status ${isCorrect ? 'status-correct' : 'status-incorrect'}`}>
          {isCorrect ? (
            <>
              <span className="status-icon">✓</span>
              <span>Correct</span>
            </>
          ) : (
            <>
              <span className="status-icon">✗</span>
              <span>Incorrect</span>
            </>
          )}
        </div>
      </div>

      <h3 className="review-question">{question}</h3>

      <div className="review-options">
        {options.map((option, optionIndex) => {
          const isUserAnswer = userAnswer === optionIndex;
          const isCorrectAnswer = correctAnswer === optionIndex;
          
          let optionClass = 'review-option';
          if (isCorrectAnswer) {
            optionClass += ' review-option-correct';
          } else if (isUserAnswer && !isCorrect) {
            optionClass += ' review-option-incorrect';
          }

          return (
            <div key={optionIndex} className={optionClass}>
              <span className="review-option-letter">
                {getOptionLetter(optionIndex)}
              </span>
              <span className="review-option-text">{option}</span>
              {isCorrectAnswer && (
                <span className="review-option-badge correct-badge">
                  ✓ Correct Answer
                </span>
              )}
              {isUserAnswer && !isCorrect && (
                <span className="review-option-badge your-answer-badge">
                  Your Answer
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!isCorrect && (
        <div className="review-explanation">
          <div className="explanation-header">
            <span className="explanation-icon">💡</span>
            <span className="explanation-title">Explanation</span>
          </div>
          <p className="explanation-text">{explanation}</p>
        </div>
      )}
    </div>
  );
};