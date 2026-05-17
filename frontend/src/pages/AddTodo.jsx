import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AlertMessage from "../components/AlertMessage";

function AddTodo() {
  const navigate = useNavigate();

  // Prevent selecting past dates
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

      // Clear form
      setFormData({
        title: "",
        description: "",
        due_date: "",
        due_time: "",
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add todo"
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      due_date: "",
      due_time: "",
    });

    setError("");
    setSuccess("");

    navigate("/dashboard");
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="page-content">
        <section className="todo-form-card centered-card">
          <h3>Add New Todo</h3>

          <p className="small-text">
            Create and schedule your upcoming tasks
          </p>

          <AlertMessage type="error" message={error} />
          <AlertMessage type="success" message={success} />

          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              name="title"
              placeholder="Todo title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Todo description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="date"
              name="due_date"
              min={today}
              value={formData.due_date}
              onChange={handleChange}
            />

            <input
              type="time"
              name="due_time"
              value={formData.due_time}
              onChange={handleChange}
            />

            <div className="form-buttons">
              <button type="submit">Add Todo</button>

              <button
                type="button"
                className="cancel-btn"
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