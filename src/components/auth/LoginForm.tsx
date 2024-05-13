import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "../../styles/css/auth/LoginForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
interface User {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await api.post("/login", formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response);
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error: any) {
      const massage = error.response?.data.detail;
      toast.error(massage || "An unexpected error occurred");
      console.log(error);
    }
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-5 form-login">
          <h2 className="title">Login to your account</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (usernameError) setUsernameError("");
                }}
              />
              {usernameError && (
                <div className="error-message">{usernameError}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-login"
            >
              Login now
            </button>
          </form>

          <div className="text-center">
            <NavLink to="/register" className="link">
              Don't Have An Account? <span>Sign up</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
