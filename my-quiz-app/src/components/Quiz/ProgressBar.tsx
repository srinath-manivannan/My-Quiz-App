import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  progress 
}) => {
  return (
    <div className="progress-section">
      <div className="progress-info">
        <span className="progress-text">
          Question {current} of {total}
        </span>
        <span className="progress-percentage">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};