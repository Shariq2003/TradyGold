import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;