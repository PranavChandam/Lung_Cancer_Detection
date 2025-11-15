import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../LoginContext/LoginContext";
import "./Login.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login, setUser } = useLogin(); 

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.toLowerCase())) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      password.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include a symbol";
    }

    if (isRegister) {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const endpoint = isRegister
        ? "http://localhost:8080/api/v1/auth/register"
        : "http://localhost:8080/api/v1/auth/login";

      const payload = isRegister
        ? { email, password, confirmPassword }
        : { email, password };

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: isRegister ? "Registered Successfully!" : "Login Successful!",
          text: res.data.message,
          confirmButtonColor: "#3085d6",
        }).then(() => {
          
          localStorage.setItem("user", JSON.stringify(res.data.user));
          login(res.data.user);
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message || "Something went wrong",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Something went wrong while connecting to the server.";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={`login-container ${darkMode ? "dark" : ""}`}>
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete={isRegister ? "new-password" : "current-password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {isRegister && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </>
        )}

        <button type="submit">{isRegister ? "Register" : "Login"}</button>

        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={toggleForm}>
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>

        <p style={{ marginTop: "1.5rem" }}>
          <span onClick={toggleTheme}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
