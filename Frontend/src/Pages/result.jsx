import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // In a real app, you would get these from your state management or API
  const interviewResults = {
    score: 85,
    totalQuestions: 5,
    correctAnswers: 4,
    timeSpent: '12:45',
    feedback: 'Strong understanding of React concepts and JavaScript fundamentals. Good problem-solving skills demonstrated.',
    areasForImprovement: [
      'Could benefit from more practice with advanced SQL queries',
      'Consider exploring more optimization techniques for large-scale applications'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Interview Results</h1>
          <p className="text-blue-200 text-lg">Full Stack Developer Position</p>
        </header>

        {/* Main Results Card */}
        <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          {/* Score Overview */}
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-bold">{interviewResults.score}%</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                Score
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-400">{interviewResults.correctAnswers}</div>
                <div className="text-blue-200 text-sm">Correct Answers</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">{interviewResults.totalQuestions}</div>
                <div className="text-blue-200 text-sm">Total Questions</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-purple-400">{interviewResults.timeSpent}</div>
                <div className="text-blue-200 text-sm">Time Spent</div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Overall Feedback</h3>
              <p className="text-green-100">{interviewResults.feedback}</p>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Areas for Improvement</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-100">
                {interviewResults.areasForImprovement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Next Steps</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• You will receive a detailed report via email within 24 hours</li>
                <li>• Our team will review your results and contact you soon</li>
                <li>• Consider practicing the identified areas for improvement</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={() => navigate('/home')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 rounded-lg font-medium transition-all"
            >
              Back to Home
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-3 rounded-lg font-medium transition-all"
            >
              Print Results
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-8 text-center text-blue-300 text-sm">
          <p>Thank you for completing the interview process. We appreciate your time and effort.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;