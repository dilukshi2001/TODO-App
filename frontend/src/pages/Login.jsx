import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AlertMessage from "../components/AlertMessage";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center">
          Welcome Back
        </h2>

        <p className="subtitle">
          Login to continue
        </p>

        <AlertMessage message={error} />

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>

            <input
              className="form-control py-2"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              className="form-control py-2"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button
              className="btn btn-primary py-2"
              type="submit"
            >
              Login
            </button>
          </div>

        </form>

        <p className="bottom-text">
          Don&apos;t have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;