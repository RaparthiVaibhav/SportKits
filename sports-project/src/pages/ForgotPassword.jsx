import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, password }
      );

      setMessage(res.data.message);
      setStep(1);

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
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
          <br /><br />
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
          <br /><br />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;