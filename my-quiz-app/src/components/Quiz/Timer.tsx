import React, { useMemo } from 'react';

interface TimerProps {
  timeRemaining: number;
  formattedTime: string;
}

export const Timer: React.FC<TimerProps> = ({ 
  timeRemaining, 
  formattedTime 
}) => {
  const TOTAL_TIME = 10 * 60; // 10 minutes
  
  const percentage = useMemo(() => {
    return (timeRemaining / TOTAL_TIME) * 100;
  }, [timeRemaining]);

  const isWarning = useMemo(() => {
    return timeRemaining <= 60; // Last minute
  }, [timeRemaining]);

  const isDanger = useMemo(() => {
    return timeRemaining <= 30; // Last 30 seconds
  }, [timeRemaining]);

  return (
    <div className={`timer ${isWarning ? 'timer-warning' : ''} ${isDanger ? 'timer-danger' : ''}`}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-content">
        <div className="timer-label">Time Remaining</div>
        <div className="timer-display">{formattedTime}</div>
        <div className="timer-bar">
          <div 
            className="timer-bar-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};