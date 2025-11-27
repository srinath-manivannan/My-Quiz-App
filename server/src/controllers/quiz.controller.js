const Question = require('../models/Question');

// Get all questions (without correct answers)
const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({})
      .select('-correctAnswer -explanation -__v')
      .lean();

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions found'
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

// Submit quiz and get results
const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers format'
      });
    }

    // Fetch all questions with correct answers
    const questions = await Question.find({}).lean();

    // Calculate results
    let score = 0;
    const results = questions.map((question) => {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question._id.toString()
      );

      const isCorrect = userAnswer && 
        userAnswer.selectedOption === question.correctAnswer;

      if (isCorrect) score++;

      return {
        questionId: question._id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer ? userAnswer.selectedOption : null,
        isCorrect,
        explanation: question.explanation
      };
    });

    res.status(200).json({
      success: true,
      data: {
        score,
        totalQuestions: questions.length,
        percentage: ((score / questions.length) * 100).toFixed(2),
        results
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get quiz statistics
const getQuizStats = async (req, res, next) => {
  try {
    const totalQuestions = await Question.countDocuments();
    const categories = await Question.distinct('category');
    const difficulties = await Question.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalQuestions,
        categories,
        difficulties
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  submitQuiz,
  getQuizStats
};