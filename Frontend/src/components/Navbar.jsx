import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/interview", label: "Start Interview", icon: "🎤" },
    { path: "/result", label: "Results", icon: "📊" },
    { path: "/details", label: "Analysis", icon: "🔍" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  const authItems = [
    { path: "/login", label: "Login", icon: "🔐" },
    { path: "/signup", label: "Sign Up", icon: "✍️" },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-white to-blue-50 shadow-lg border-b border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
              <img 
                src="https://img.icons8.com/fluency/48/000000/resume.png" 
                alt="Resume Interview Logo" 
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                InterviewPrep
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Career Success</p>
            </div>
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActivePath(item.path)
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600 border border-transparent hover:border-blue-200"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {authItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-blue-200 shadow-2xl">
          <div className="px-4 py-6 space-y-3">
            {/* Navigation Items */}
            <div className="grid grid-cols-1 gap-2 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 bg-blue-50 hover:bg-white hover:shadow-md border border-blue-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="pt-4 border-t border-blue-200">
              <div className="grid grid-cols-2 gap-3">
                {authItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-center space-x-2 px-4 py-4 rounded-2xl font-semibold text-center transition-all duration-300 ${
                      isActivePath(item.path)
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Additional Mobile Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://img.icons8.com/fluency/48/000000/artificial-intelligence.png" 
                  alt="AI Powered" 
                  className="w-8 h-8"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">AI-Powered Interviews</p>
                  <p className="text-xs text-gray-600">Get real-time feedback & analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}