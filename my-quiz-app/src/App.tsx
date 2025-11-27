// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React from 'react';
import { Header } from './components/Layout/Header';
import { Container } from './components/Layout/Container';
import { QuizCard } from './components/Quiz/QuizCard';
import { ResultCard } from './components/Result/ResultCard';
import { ReviewCard } from './components/Result/ReviewCard';
import { Button } from './components/Common/Button';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import { useQuiz } from './hooks/useQuiz';
import './App.css';

function App() {
  const {
    questions,
    currentQuestion,
    currentQuestionIndex,
    timeRemaining,
    formattedTime,
    status,
    results,
    score,
    loading,
    error,
    progress,
    currentAnswer,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    handleSubmit,
    restartQuiz,
  } = useQuiz();

  // Loading state
  if (loading && questions.length === 0) {
    return (
      <>
        <Header />
        <Container>
          <LoadingSpinner message="Loading questions..." />
        </Container>
      </>
    );
  }

  // Error state
  if (error && questions.length === 0) {
    return (
      <>
        <Header />
        <Container>
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} variant="primary">
              Retry
            </Button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        {/* Welcome Screen */}
        {status === 'idle' && (
          <div className="welcome-screen">
            <div className="welcome-card">
              <div className="welcome-icon">📝</div>
              <h1 className="welcome-title">Welcome to the Quiz!</h1>
              <p className="welcome-description">
                Test your knowledge with {questions.length} questions covering various topics.
              </p>
              
              <div className="quiz-info">
                <div className="info-item">
                  <span className="info-icon">📊</span>
                  <div className="info-content">
                    <strong>Total Questions</strong>
                    <span>{questions.length} Questions</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">⏱️</span>
                  <div className="info-content">
                    <strong>Duration</strong>
                    <span>10 Minutes</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">✅</span>
                  <div className="info-content">
                    <strong>Passing Score</strong>
                    <span>60%</span>
                  </div>
                </div>
              </div>

              <div className="quiz-rules">
                <h3>Instructions:</h3>
                <ul>
                  <li>Answer all questions within the time limit</li>
                  <li>You can navigate between questions</li>
                  <li>Quiz will auto-submit when time runs out</li>
                  <li>Review your answers after submission</li>
                </ul>
              </div>

              <Button onClick={startQuiz} variant="primary" fullWidth>
                Start Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Quiz in Progress */}
        {status === 'started' && currentQuestion && (
          <QuizCard
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            timeRemaining={timeRemaining}
            formattedTime={formattedTime}
            progress={progress}
            currentAnswer={currentAnswer}
            onSelectAnswer={selectAnswer}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onSubmit={handleSubmit}
            canGoNext={currentQuestionIndex < questions.length - 1}
            canGoPrevious={currentQuestionIndex > 0}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        )}

        {/* Results Screen */}
        {status === 'completed' && (
          <div className="results-screen">
            <ResultCard
              score={score}
              totalQuestions={questions.length}
              onRestart={restartQuiz}
            />

            <div className="review-section">
              <h2 className="review-title">Answer Review</h2>
              <div className="review-list">
                {results.map((result, index) => (
                  <ReviewCard key={result.questionId} result={result} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading overlay for submission */}
        {loading && status === 'started' && (
          <div className="loading-overlay">
            <LoadingSpinner message="Submitting your quiz..." />
          </div>
        )}
      </Container>
    </>
  );
}

export default App;