import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/common.css";

const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <img src="/images/logo.png" alt="Logo" className="account-logo" />

      <h2>Welcome to your account</h2>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Account;