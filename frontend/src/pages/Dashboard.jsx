import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [editingTodo, setEditingTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await api.get(`/todos?search=${search}&status=${status}`);
      setTodos(response.data);
    } catch (err) {
      setError("Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search, status]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title) {
      setError("Todo title is required");
      return;
    }

    try {
      if (editingTodo) {
        await api.put(`/todos/${editingTodo.id}`, {
          title: formData.title,
          description: formData.description,
          status: editingTodo.status,
        });
        setEditingTodo(null);
      } else {
        await api.post("/todos", formData);
      }

      setFormData({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch {
      setError("Delete failed");
    }
  };

  const handleStatusChange = async (todo) => {
    const newStatus = todo.status === "completed" ? "pending" : "completed";

    try {
      await api.put(`/todos/${todo.id}`, {
        title: todo.title,
        description: todo.description,
        status: newStatus,
      });

      fetchTodos();
    } catch {
      setError("Status update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div>
          <h2>Todo Manager</h2>
          <p>Hello, {user?.name}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="dashboard-content">
        <section className="todo-form-card">
          <h3>{editingTodo ? "Edit Todo" : "Create Todo"}</h3>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <button type="submit">
              {editingTodo ? "Update Todo" : "Add Todo"}
            </button>

            {editingTodo && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingTodo(null);
                  setFormData({ title: "", description: "" });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="todo-list-card">
          <div className="list-header">
            <h3>My Todos</h3>

            <div className="filters">
              <input
                type="text"
                placeholder="Search todo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {todos.length === 0 ? (
            <p className="empty-text">No todos found</p>
          ) : (
            <div className="todo-grid">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-card ${
                    todo.status === "completed" ? "completed-card" : ""
                  }`}
                >
                  <div className="todo-card-header">
                    <h4>{todo.title}</h4>
                    <span className={`status ${todo.status}`}>
                      {todo.status}
                    </span>
                  </div>

                  <p>{todo.description || "No description added"}</p>

                  <div className="todo-actions">
                    <button onClick={() => handleStatusChange(todo)}>
                      {todo.status === "completed"
                        ? "Mark Pending"
                        : "Mark Completed"}
                    </button>

                    <button className="edit-btn" onClick={() => handleEdit(todo)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;