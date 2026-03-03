import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // 🔥 Notify app that login happened (VERY IMPORTANT)
      window.dispatchEvent(new Event("login"));

      setMessage("Login successful!");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>
          Signup
        </span>
      </p>

      <Link to="/forgot-password" className="fpass">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;