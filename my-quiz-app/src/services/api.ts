// import { QuestionsResponse, SubmitResponse, UserAnswer } from '../types/quiz.types';

import type { QuestionsResponse, UserAnswer, SubmitResponse } from "../types/quiz.types";

const API_BASE_URL = 'http://localhost:5000/api/quiz';

export const quizAPI = {
  // Fetch all questions (called once)
  getQuestions: async (): Promise<QuestionsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // Submit quiz answers
  submitQuiz: async (answers: UserAnswer[]): Promise<SubmitResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  },
};