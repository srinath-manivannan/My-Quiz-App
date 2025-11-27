import React from 'react';
import { QuestionCard } from './QuestionCard';
import { Timer } from './Timer';
import { ProgressBar } from './ProgressBar';
import { Button } from '../Common/Button';
import type { Question, UserAnswer } from '../../types/quiz.types';
// import { Question, UserAnswer } from '../../types/quiz.types';

interface QuizCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  formattedTime: string;
  progress: number;
  currentAnswer: UserAnswer | undefined;
  onSelectAnswer: (optionIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  timeRemaining,
  formattedTime,
  progress,
  currentAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  onSubmit,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}) => {
  return (
    <div className="quiz-container">
      <Timer timeRemaining={timeRemaining} formattedTime={formattedTime} />
      
      <ProgressBar 
        current={questionIndex + 1} 
        total={totalQuestions} 
        progress={progress} 
      />

      <QuestionCard
        question={question}
        questionNumber={questionIndex + 1}
        selectedOption={currentAnswer?.selectedOption}
        onSelectOption={onSelectAnswer}
      />

      <div className="navigation-buttons">
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          variant="secondary"
        >
          ← Previous
        </Button>

        <div className="nav-button-group">
          {!isLastQuestion ? (
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              variant="primary"
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              variant="success"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};