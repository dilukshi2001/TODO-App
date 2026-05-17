import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AlertMessage from "../components/AlertMessage";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters"
      );
      return;
    }

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="text-center">
          Create Account
        </h2>

        <p className="subtitle">
          Register to manage your todos
        </p>

        <AlertMessage
          type="error"
          message={error}
        />

        <AlertMessage
          type="success"
          message={success}
        />

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Name
            </label>

            <input
              className="form-control py-2"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              minLength={6}
            />
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary py-2"
              type="submit"
            >
              Register
            </button>

            <button
              type="button"
              className="btn btn-secondary py-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;