import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in a real app, this would come from an API
  const userData = {
    name: "SANJAI K R",
    email: "sanjaikr88@gmail.com",
    reportedIssue: "Change Password",
    assessment: {
      completed: 26,
      total: 45,
      yetToStart: 19
    },
    course: {
      inProgress: 0,
      yetToStart: 0
    },
    practice: {
      completed: 0,
      yetToStart: 0
    },
    accuracy: {
      overall: 64,
      subjects: [
        { name: "Data-Structures", accuracy: 78 },
        { name: "DBMS", accuracy: 65 },
        { name: "Java-Programming", accuracy: 72 },
        { name: "Others", accuracy: 55 }
      ],
      coding: [
        { language: "C", questions: 21, submissions: 23, testCases: 116 },
        { language: "Java", questions: 19, submissions: 24, testCases: 96 }
      ]
    },
    recentAssessments: [
      { name: "Frontend Developer Test", date: "2023-11-15", score: 82 },
      { name: "JavaScript Fundamentals", date: "2023-11-10", score: 76 },
      { name: "Database Design Quiz", date: "2023-11-05", score: 88 }
    ],
    recentCourses: [
      { name: "Advanced React Patterns", progress: 65 },
      { name: "System Design Fundamentals", progress: 30 },
      { name: "Data Structures Mastery", progress: 45 }
    ]
  };

  const ProgressCircle = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4f46e5"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = "bg-indigo-600" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome {userData.name}</h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Reported Issue</h3>
                  <p className="text-sm text-amber-700 mt-1">{userData.reportedIssue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-1 mb-8">
          <nav className="flex space-x-2">
            {['overview', 'assessments', 'courses', 'practice'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Activities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assessment Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Assessment Activity</h2>
                <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  View Recent Assessments →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-indigo-700">Completed</span>
                    <span className="text-lg font-bold text-indigo-900">
                      {userData.assessment.completed}/{userData.assessment.total}
                    </span>
                  </div>
                  <ProgressBar percentage={(userData.assessment.completed / userData.assessment.total) * 100} />
                </div>
                
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Yet to Start</span>
                    <span className="text-lg font-bold text-gray-900">
                      {userData.assessment.yetToStart}/{userData.assessment.total}
                    </span>
                  </div>
                  <ProgressBar 
                    percentage={(userData.assessment.yetToStart / userData.assessment.total) * 100} 
                    color="bg-gray-400"
                  />
                </div>
              </div>
              
              {/* Recent Assessments */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
                <div className="space-y-3">
                  {userData.recentAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{assessment.name}</p>
                        <p className="text-sm text-gray-500">{assessment.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {assessment.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course & Practice Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Course Activity */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Course Activity</h2>
                  <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                    View Recent Courses →
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-700">In Progress</span>
                      <span className="text-lg font-bold text-blue-900">
                        {userData.course.inProgress}
                      </span>
                    </div>
                    <ProgressBar 
                      percentage={userData.course.inProgress > 0 ? 50 : 0} 
                      color="bg-blue-500"
                    />
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Yet to Start</span>
                      <span className="text-lg font-bold text-gray-900">
                        {userData.course.yetToStart}
                      </span>
                    </div>
                    <ProgressBar 
                      percentage={0} 
                      color="bg-gray-400"
                    />
                  </div>
                </div>
                
                {/* Recent Courses */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h3>
                  <div className="space-y-3">
                    {userData.recentCourses.map((course, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <ProgressBar percentage={course.progress} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Activity */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Practice Activity</h2>
                  <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                    View Recent Practice →
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-700">Completed</span>
                      <span className="text-lg font-bold text-green-900">
                        {userData.practice.completed}
                      </span>
                    </div>
                    <ProgressBar 
                      percentage={0} 
                      color="bg-green-500"
                    />
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Yet to Start</span>
                      <span className="text-lg font-bold text-gray-900">
                        {userData.practice.yetToStart}
                      </span>
                    </div>
                    <ProgressBar 
                      percentage={0} 
                      color="bg-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Accuracy & Performance */}
          <div className="space-y-8">
            {/* Overall Accuracy */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Overall Accuracy</h2>
              <div className="flex flex-col items-center">
                <ProgressCircle percentage={userData.accuracy.overall} />
                <p className="mt-4 text-gray-600 text-center">
                  You're performing better than 72% of other learners
                </p>
              </div>
            </div>

            {/* Subject & Coding Accuracy */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Breakdown</h2>
              
              {/* Subject Accuracy */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Level Accuracy</h3>
                <div className="space-y-4">
                  {userData.accuracy.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{subject.name}</span>
                      <div className="flex items-center space-x-2">
                        <ProgressBar 
                          percentage={subject.accuracy} 
                          color={subject.accuracy > 70 ? "bg-green-500" : subject.accuracy > 50 ? "bg-yellow-500" : "bg-red-500"}
                          className="w-24"
                        />
                        <span className="text-sm font-medium text-gray-700 w-10">{subject.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Coding Accuracy */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Programming Accuracy</h3>
                <div className="space-y-4">
                  {userData.accuracy.coding.map((language, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{language.language}</span>
                        <span className="text-sm text-gray-500">
                          Ques: {language.questions} | Subs: {language.submissions} | Tests: {language.testCases}
                        </span>
                      </div>
                      <ProgressBar 
                        percentage={(language.submissions / language.testCases) * 100} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                  Change Password
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                  Update Profile
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                  View Certificates
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;