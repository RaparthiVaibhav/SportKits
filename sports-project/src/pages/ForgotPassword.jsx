import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/forgotpassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // STEP 1 - SEND OTP
  const handleSendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email }
      );

      setMessage(res.data.message);
      setStep(2);

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // STEP 2 - VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      setMessage(res.data.message);
      setStep(3);

    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  // STEP 3 - RESET PASSWORD
  const handleResetPassword = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, password }
      );

      setMessage("Password reset successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;