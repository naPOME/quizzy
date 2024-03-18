
import React from 'react';

const CompletionDialog = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-14 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Exam Completed!</h2>
        <p className="mb-4">You have completed the exam.</p>
        {result && (
          <div>
            <p className="mb-2">Your result:</p>
            <p>Correct Answers: {result.correctAnswers}</p>
            <p>Total Questions: {result.totalQuestions}</p>
            <p>Percentage: {result.percentage}%</p>
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionDialog;
