import React, { useMemo } from 'react';
import { Button } from '../Common/Button';
import { formatPercentage, getGrade, getPerformanceMessage } from '../../utils/helpers';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = useMemo(() => {
    return (score / totalQuestions) * 100;
  }, [score, totalQuestions]);

  const grade = useMemo(() => getGrade(percentage), [percentage]);
  const message = useMemo(() => getPerformanceMessage(percentage), [percentage]);

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>Quiz Completed! 🎉</h2>
      </div>

      <div className="result-score-container">
        <div className="result-circle">
          <div className="result-circle-inner">
            <div className="result-score">{score}</div>
            <div className="result-total">/ {totalQuestions}</div>
          </div>
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <span className="stat-label">Percentage</span>
            <span className="stat-value">{formatPercentage(percentage)}</span>
          </div>
          <div className="result-stat">
            <span className="stat-label">Grade</span>
            <span className={`stat-value grade-${grade.toLowerCase()}`}>{grade}</span>
          </div>
        </div>
      </div>

      <div className="result-message">{message}</div>

      <div className="result-breakdown">
        <div className="breakdown-item correct">
          <span className="breakdown-icon">✓</span>
          <span className="breakdown-text">Correct: {score}</span>
        </div>
        <div className="breakdown-item incorrect">
          <span className="breakdown-icon">✗</span>
          <span className="breakdown-text">Incorrect: {totalQuestions - score}</span>
        </div>
      </div>

      <Button onClick={onRestart} variant="primary" fullWidth>
        Restart Quiz
      </Button>
    </div>
  );
};