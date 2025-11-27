// Get letter for option (A, B, C, D)
export const getOptionLetter = (index: number): string => {
  return String.fromCharCode(65 + index);
};

// Get color class based on correctness
export const getAnswerColorClass = (
  isCorrect: boolean | null
): string => {
  if (isCorrect === null) return '';
  return isCorrect ? 'correct' : 'incorrect';
};

// Format percentage
export const formatPercentage = (percentage: string | number): string => {
  return `${parseFloat(percentage.toString()).toFixed(1)}%`;
};

// Get grade based on percentage
export const getGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

// Get performance message
export const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) return '🎉 Excellent! Outstanding performance!';
  if (percentage >= 80) return '👏 Great job! Very good performance!';
  if (percentage >= 70) return '👍 Good work! Nice effort!';
  if (percentage >= 60) return '😊 Fair performance. Keep practicing!';
  return '💪 Keep learning! You can do better!';
};