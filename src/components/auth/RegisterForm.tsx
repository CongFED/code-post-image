import React, { useState } from "react";
import "../../styles/css/auth/LoginForm.css";
import { FcGoogle } from "react-icons/fc";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  //Validation Form
  const validateForm = () => {
    let isValid = true;
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 3 || username.length > 16) {
      setUsernameError("Username must be between 3 and 16 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, including at least one uppercase letter, one lowercase letter, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  //Hanlde hide error when continue input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) setUsernameError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(""); // Clear password error as soon as user starts typing
  };
  //Handle Submit and call api
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/user", { username, password });
        console.log(response);
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error: any) {
        const massage = error.response?.data.detail;
        toast.error(massage || "An unexpected error occurred");
        console.log(error);
      }
    }
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-5 form-login">
          <h2 className="title">Create an account</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
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
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-login"
            >
              Create an account
            </button>

            <button
              type="button"
              className="btn btn-primary btn-block btn-login btn-login-google"
              onClick={() => toast.success("Google login not implemented yet")}
            >
              <span className="icon-google">
                <FcGoogle />
              </span>
              Continue with Google
            </button>
          </form>

          <div className="text-center">
            <NavLink to="/login" className="link">
              Already have an account? <span>Log in</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
