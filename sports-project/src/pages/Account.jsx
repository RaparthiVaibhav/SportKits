import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const Account = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="page">
      <img src="/images/logo.png
      " alt="Logo" className="account-logo" />

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Account;
