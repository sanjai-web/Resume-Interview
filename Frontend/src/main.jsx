// Frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"; // Make sure this import exists
import Navbar from "./components/Navbar";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Profile from "./Pages/profile";
import Interview from "./Pages/interview";
import Result from "./Pages/result";
import Details from "./Pages/details";
import GetStart from "./Pages/getstart";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/result" element={<Result />} />
          <Route path="/details" element={<Details />} />
          <Route path="/getstart" element={<GetStart />} />
        </Routes>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
);