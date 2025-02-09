import React from "react";
import Header from "./Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginPage from "./components/Authentication/Login/LoginPage";
import SignupPage from "./components/Authentication/SignUp/SignupPage";
import Chatbot from "./components/Chatbot/Chatbot";
import MyFooter from "./components/MyFooter";

export default function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className=" h-auto">
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      {!isAuthPage && <MyFooter/>}
    </div>
  );
}
