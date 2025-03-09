import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import Gateway from "./pages/Payment_Gateway/Gateway.jsx";
import PaymentSuccess from "./pages/Payment_Gateway/PaymentSuccess.jsx";
import PaymentFailed from "./pages/Payment_Gateway/PaymentFailed.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
            <Route path="/mock-payment" element={<Gateway />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
