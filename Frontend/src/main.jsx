// Frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import AuthNavbar from "./components/NavbarLogin";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Profile from "./Pages/profile";
import Interview from "./Pages/interview";
import Result from "./Pages/result";
import Details from "./Pages/details";
import GetStart from "./Pages/getstart";

function Layout() {
  const location = useLocation();

  // Define routes that should use AuthNavbar
  const authRoutes = ["/login", "/signup", "/"];
  const isAuthPage = authRoutes.includes(location.pathname);

  // Hide navbar for interview page
  const hideNavbarRoutes = ["/interview"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (isAuthPage ? <AuthNavbar /> : <Navbar />)}
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<GetStart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/result" element={<Result />} />
          <Route path="/details" element={<Details />} />
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
