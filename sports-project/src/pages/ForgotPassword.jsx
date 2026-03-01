import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email }  
      );

      setMessage(res.data.message);

    } catch (error) {
      console.log(error.response?.data);
      setMessage(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button
        onClick={handleSendOtp}
        style={{ padding: "10px 20px" }}
      >
        Send OTP
      </button>

      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;