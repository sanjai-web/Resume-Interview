import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [interviewActive, setInterviewActive] = useState(true);
  const [aiExpression, setAiExpression] = useState("neutral");
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Sample questions for demonstration
  const questions = [
    "Tell me about your experience with React and its core concepts like hooks, state management, and component lifecycle.",
    "How would you optimize a slow-performing web application? Discuss both frontend and backend strategies.",
    "Write a function to find the longest common prefix string amongst an array of strings.",
    "Write a SQL query to find the second highest salary from an Employees table with columns: id, name, salary, department_id.",
    "Explain the concept of closures in JavaScript and provide a practical example of where you would use them."
  ];

  // Enter fullscreen mode
  const enterFullscreen = () => {
    const elem = containerRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // Exit fullscreen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize webcam and start interview
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    startCamera();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    // Set first question
    setCurrentQuestion(questions[0]);
    
    // Enter fullscreen automatically
    enterFullscreen();
    
    // Add event listener for ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowExitConfirm(true);
      }
      
      // Submit with Ctrl+Enter
      if (e.ctrlKey && e.key === 'Enter') {
        handleSubmitAnswer();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Please do not switch tabs during the interview. This action has been recorded.");
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate AI expressions based on question type
  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion.includes("Write a SQL") || currentQuestion.includes("Write a function")) {
        setAiExpression("thinking");
        setTimeout(() => setAiExpression("speaking"), 1500);
      } else {
        setAiExpression("speaking");
      }
    }
  }, [currentQuestion]);

  const handleSubmitAnswer = () => {
    // In a real app, this would send the answer to the backend
    console.log("Answer submitted:", answer);
    
    // Move to next question or finish interview
    const currentIndex = questions.indexOf(currentQuestion);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
      setAiExpression("neutral");
      setTimeout(() => setAiExpression("speaking"), 500);
    } else {
      // End of interview
      setShowExitConfirm(true);
    }
    
    setAnswer("");
  };

  const handleExitInterview = () => {
    setInterviewActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Exit fullscreen and navigate to results
    exitFullscreen();
    
    // Navigate to results page after a short delay
    setTimeout(() => {
      navigate('/result');
    }, 2000);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden"
    >
      {interviewActive ? (
        <>
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-black/30 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center space-x-4 mb-3 sm:mb-0">
              <div className="bg-white/10 p-2 rounded-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">AI Technical Interview</h1>
                <p className="text-xs sm:text-sm text-blue-200">Full Stack Developer Position</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-normal">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-blue-200">Time</div>
                <div className="text-lg sm:text-xl font-mono font-bold">{formatTime(timer)}</div>
              </div>
              
              <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-xs sm:text-sm">{isRecording ? 'Recording' : 'Paused'}</span>
              </div>

              {/* Fullscreen indicator */}
              <div className="hidden sm:flex items-center space-x-2 text-blue-300 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Full Screen</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-col lg:flex-row p-3 sm:p-4 lg:p-6 gap-4 sm:gap-6 h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)] overflow-auto">
            {/* Left Panel - AI Interviewer & Answer */}
            <div className="lg:w-2/3 flex flex-col gap-4 sm:gap-6">
              {/* AI Interviewer Section */}
              <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold">AI Interviewer</h2>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-xs sm:text-sm text-blue-300">
                      {aiExpression === 'thinking' ? 'Analyzing...' : 'Speaking'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative mb-4 sm:mb-8">
                    {/* AI Avatar - Responsive sizing */}
                    <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative shadow-2xl">
                      {/* Face */}
                      <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-white/10 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Eyes */}
                        <div className="flex space-x-8 sm:space-x-10 lg:space-x-12 mb-6 sm:mb-8">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full relative">
                            <div className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-900 rounded-full absolute top-1 left-1"></div>
                          </div>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full relative">
                            <div className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-900 rounded-full absolute top-1 left-1"></div>
                          </div>
                        </div>
                        
                        {/* Mouth - animated based on expression */}
                        <div className={`w-12 h-6 sm:w-14 sm:h-6 lg:w-16 lg:h-8 rounded-b-full bg-white transition-all duration-300 ${
                          aiExpression === 'speaking' ? 'animate-pulse h-4 sm:h-5 lg:h-6' : 
                          aiExpression === 'thinking' ? 'h-3 sm:h-3 lg:h-4 rounded-full' : 'h-1 sm:h-2 lg:h-2'
                        }`}></div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-yellow-400 rounded-full opacity-70"></div>
                      <div className="absolute -bottom-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-400 rounded-full opacity-50"></div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg whitespace-nowrap">
                      {aiExpression === 'thinking' ? 'Thinking...' : 'Asking Question'}
                    </div>
                  </div>
                  
                  <div className="text-center w-full max-w-2xl">
                    <p className="text-blue-200 mb-2 text-sm sm:text-base">Your AI interviewer is asking:</p>
                    <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-500/30">
                      <p className="text-sm sm:text-lg font-medium">{currentQuestion}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Answer Section */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col min-h-60 sm:h-80">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold">Your Answer</h2>
                  <div className="text-xs sm:text-sm text-blue-300">
                    {answer.length} characters • Question {questions.indexOf(currentQuestion) + 1} of {questions.length}
                  </div>
                </div>
                
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here. For code or SQL queries, you can use proper formatting and syntax highlighting."
                  className="flex-1 w-full bg-black/30 text-white p-3 sm:p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-xs sm:text-sm"
                  rows={4}
                />
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
                  <div className="text-xs sm:text-sm text-blue-300">
                    Press <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-black/50 rounded text-xs">Ctrl+Enter</kbd> to submit
                  </div>
                  
                  <button 
                    onClick={handleSubmitAnswer}
                    disabled={!answer.trim()}
                    className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-all w-full sm:w-auto ${
                      answer.trim() 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg' 
                        : 'bg-gray-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Webcam and Info */}
            <div className="lg:w-1/3 flex flex-col space-y-4 sm:space-y-6">
              {/* Webcam Feed */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Your Camera</h2>
                  <div className="flex items-center space-x-2 bg-red-500/20 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm">Live</span>
                  </div>
                </div>
                
                <div className="flex-1 bg-black rounded-lg sm:rounded-xl overflow-hidden relative">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Camera overlay elements */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/50 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
                    {new Date().toLocaleTimeString()}
                  </div>
                  
                  {/* Network status indicator */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-1 bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    <span className="text-xs">Good</span>
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-center text-blue-200">
                  Make sure your face is clearly visible and well-lit
                </div>
              </div>
              
              {/* Interview Info */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">Interview Details</h3>
                
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Position:</span>
                    <span>Full Stack Developer</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-blue-200">Difficulty:</span>
                    <span className="text-yellow-400">Intermediate</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-blue-200">Questions:</span>
                    <span>{questions.indexOf(currentQuestion) + 1}/{questions.length}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-blue-200">Time per question:</span>
                    <span>Unlimited</span>
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center text-xs sm:text-sm text-blue-200">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Take your time to provide thoughtful answers
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          {/* Exit Confirmation Modal */}
          {showExitConfirm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 max-w-md w-full border border-white/10 shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">End Interview?</h3>
                </div>
                
                <p className="text-gray-300 mb-6 text-sm sm:text-base">
                  Are you sure you want to end this interview? Your progress will be saved, but you won't be able to resume from this point.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button 
                    onClick={handleExitInterview}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-lg font-medium transition-all"
                  >
                    Yes, End Interview
                  </button>
                  <button 
                    onClick={handleCancelExit}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="mt-4 text-center text-xs sm:text-sm text-gray-400">
                  Press ESC again to close this dialog
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Results Redirect Screen */
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interview Completed</h2>
            <p className="text-blue-200 mb-6 sm:mb-8 text-sm sm:text-base">
              Thank you for completing the interview. We're now analyzing your responses and will provide feedback shortly.
            </p>
            
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6 sm:mb-8 text-sm sm:text-base">
              <div className="flex justify-between mb-2">
                <span>Questions Answered:</span>
                <span>{questions.indexOf(currentQuestion) + 1} / {questions.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Time Spent:</span>
                <span>{formatTime(timer)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-400">Completed</span>
              </div>
            </div>
            
            <div className="text-blue-300 flex items-center justify-center text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Redirecting to results page...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;