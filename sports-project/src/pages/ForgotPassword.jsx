import { useState } from "react";
import axios from "axios";
import "../styles/forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email }
      );

      setMessage(res.data.message || "OTP sent to your email");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive an OTP.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {message && <p className="success">{message}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;