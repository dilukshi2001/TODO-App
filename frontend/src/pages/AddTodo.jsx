import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AlertMessage from "../components/AlertMessage";

function AddTodo() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title || !formData.due_date || !formData.due_time) {
      setError("Title, date and time are required");
      return;
    }

    try {
      await api.post("/todos", formData);

      setSuccess("Todo added successfully");

      setFormData({
        title: "",
        description: "",
        due_date: "",
        due_time: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add todo");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="page-content">
        <section className="todo-form-card centered-card">
          <h3>Add New Todo</h3>
          <p className="small-text">Create and schedule your upcoming tasks</p>

          <AlertMessage type="error" message={error} />
          <AlertMessage type="success" message={success} />

          <form onSubmit={handleAddTodo} className="d-flex flex-column gap-3">

            <div>
              <label className="form-label fw-semibold">
                Todo Title
              </label>

              <input
                className="form-control py-2"
                type="text"
                name="title"
                placeholder="Enter todo title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                className="form-control py-2"
                name="description"
                placeholder="Enter todo description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div>
              <label className="form-label fw-semibold">
                Due Date
              </label>

              <input
                className="form-control py-2"
                type="date"
                name="due_date"
                min={today}
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label fw-semibold">
                Due Time
              </label>

              <input
                className="form-control py-2"
                type="time"
                name="due_time"
                value={formData.due_time}
                onChange={handleChange}
              />
            </div>

            <div className="form-buttons mt-2">
              <button className="btn btn-primary" type="submit">
                Add Todo
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddTodo;