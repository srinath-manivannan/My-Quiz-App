import { useState, useEffect, useMemo, useCallback } from 'react';
import { quizAPI } from '../services/api';
import type { Question, UserAnswer, QuizStatus, QuizResult } from '../types/quiz.types';
// import { Question, UserAnswer, QuizResult, QuizStatus } from '../types/quiz.types';

const QUIZ_DURATION = 10 * 60; // 10 minutes in seconds

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION);
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on mount (only once)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await quizAPI.getQuestions();
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (status !== 'started') return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Memoized current question
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex] || null;
  }, [questions, currentQuestionIndex]);

  // Memoized progress calculation
  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  // Memoized formatted time
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  // Check if current question is answered
  const isCurrentQuestionAnswered = useMemo(() => {
    return answers.some(
      (answer) => answer.questionId === currentQuestion?._id
    );
  }, [answers, currentQuestion]);

  // Get user's answer for current question
  const currentAnswer = useMemo(() => {
    return answers.find(
      (answer) => answer.questionId === currentQuestion?._id
    );
  }, [answers, currentQuestion]);

  // Start quiz
  const startQuiz = useCallback(() => {
    setStatus('started');
    setTimeRemaining(QUIZ_DURATION);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  }, []);

  // Select answer
  const selectAnswer = useCallback((optionIndex: number) => {
    if (!currentQuestion || status !== 'started') return;

    setAnswers((prev) => {
      const existingIndex = prev.findIndex(
        (ans) => ans.questionId === currentQuestion._id
      );

      if (existingIndex !== -1) {
        // Update existing answer
        const updated = [...prev];
        updated[existingIndex] = {
          questionId: currentQuestion._id,
          selectedOption: optionIndex,
        };
        return updated;
      } else {
        // Add new answer
        return [
          ...prev,
          {
            questionId: currentQuestion._id,
            selectedOption: optionIndex,
          },
        ];
      }
    });
  }, [currentQuestion, status]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Submit quiz
  const handleSubmit = useCallback(async () => {
    if (status === 'completed') return;

    setLoading(true);
    setError(null);

    try {
      const response = await quizAPI.submitQuiz(answers);
      setResults(response.data.results);
      setScore(response.data.score);
      setStatus('completed');
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [answers, status]);

  // Restart quiz
  const restartQuiz = useCallback(() => {
    setStatus('idle');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeRemaining(QUIZ_DURATION);
    setResults([]);
    setScore(0);
  }, []);

  return {
    // State
    questions,
    currentQuestion,
    currentQuestionIndex,
    answers,
    timeRemaining,
    formattedTime,
    status,
    results,
    score,
    loading,
    error,
    progress,
    isCurrentQuestionAnswered,
    currentAnswer,
    
    // Actions
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    handleSubmit,
    restartQuiz,
  };
};