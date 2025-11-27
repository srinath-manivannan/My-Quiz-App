const express = require('express');
const router = express.Router();
const {
  getQuestions,
  submitQuiz,
  getQuizStats
} = require('../controllers/quiz.controller');

// GET /api/quiz/questions - Fetch all questions
router.get('/questions', getQuestions);

// POST /api/quiz/submit - Submit quiz answers
router.post('/submit', submitQuiz);

// GET /api/quiz/stats - Get quiz statistics
router.get('/stats', getQuizStats);

module.exports = router;