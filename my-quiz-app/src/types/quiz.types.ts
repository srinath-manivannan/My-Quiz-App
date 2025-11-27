export interface Question {
  _id: string;
  question: string;
  options: string[];
  category?: string;
  difficulty?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
}

export interface QuizResult {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number | null;
  isCorrect: boolean;
  explanation: string;
}

export interface SubmitResponse {
  success: boolean;
  data: {
    score: number;
    totalQuestions: number;
    percentage: string;
    results: QuizResult[];
  };
}

export interface QuestionsResponse {
  success: boolean;
  count: number;
  data: Question[];
}

export type QuizStatus = 'idle' | 'started' | 'completed';