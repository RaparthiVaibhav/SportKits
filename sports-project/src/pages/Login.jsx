import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert("Login successful");

      // save token
      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (err) {
      alert("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <a className ="fpass" href="/forgot-password">Forgot password?</a>
      </form>

      <p>
        Don’t have an account?{" "}
        <span
          style={{ color: "#2563eb", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;