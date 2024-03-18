
import React, { useState, useEffect } from 'react';
import questionsData from './data.json';
import CompletionDialog from './CompletionDialog';

const ExamPage = () => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsData.questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [examResult, setExamResult] = useState(null); 

  useEffect(() => {
    setExamQuestions(questionsData.questions);
    setTimeLeft(questionsData.questions.length * 3 * 60); 
  }, []);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } 
  }, [timeLeft, timerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    
  };

  const handleAnswerSelection = (event, questionIndex) => {
    const selectedAnswer = event.target.value;
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
  let correctAnswers = 0;
  for (let i = 0; i < examQuestions.length; i++) {
    if (selectedAnswers[i] === examQuestions[i].answer) {
      correctAnswers++;
    }
  }
  const result = (correctAnswers / examQuestions.length) * 100;
  console.log(`Result: ${correctAnswers} out of ${examQuestions.length} (${result.toFixed(2)}%)`);
  setExamResult({ correctAnswers, totalQuestions: examQuestions.length, percentage: result.toFixed(2) });
  stopTimer();
  setShowCompletionDialog(true); 
  
};


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Exam Questions</h1>
      <div className="max-w-lg w-full">
        <div className={`bg-white rounded-lg p-6 mb-6 shadow-md ${!timerRunning ? '' : 'hidden'}`}>
          <button
            onClick={startTimer}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start Exam
          </button>
        </div>
        {timerRunning && (
          <>
            {examQuestions.map((question, index) => (
              <div key={index} className={`bg-white rounded-lg p-6 mb-6 shadow-md ${index === currentQuestionIndex ? '' : 'hidden'}`}>
                <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
                <ul className="flex flex-col pl-0 items-start space-y-2">
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          name={`question-${index}`}
                          value={choice}
                          onChange={(event) => handleAnswerSelection(event, index)}
                        />
                        <span className="ml-2">{choice}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < examQuestions.length - 1 && (
                <button
                  onClick={handleNext}
                  className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Next
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </>
        )}
        {timerRunning && (
          <div className="mt-4 text-center text-gray-600">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        )}
      </div>
      {showCompletionDialog && <CompletionDialog result={examResult} onClose={() => setShowCompletionDialog(false)} />}
    </div>
  );
};

export default ExamPage;
