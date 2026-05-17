import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import AlertMessage from "../components/AlertMessage";
import ConfirmModal from "../components/ConfirmModal";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await api.get(`/todos?search=${search}&status=${status}`);
      setTodos(response.data);
    } catch {
      setError("Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search, status]);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description || "",
      due_date: todo.due_date?.slice(0, 10) || "",
      due_time: todo.due_time?.slice(0, 5) || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/todos/${editingTodo.id}`, {
        ...formData,
        status: editingTodo.status,
      });

      setEditingTodo(null);
      setFormData({ title: "", description: "", due_date: "", due_time: "" });
      fetchTodos();
    } catch {
      setError("Todo update failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/todos/${deleteId}`);
      setDeleteId(null);
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
        due_date: todo.due_date?.slice(0, 10),
        due_time: todo.due_time,
        status: newStatus,
      });

      fetchTodos();
    } catch {
      setError("Status update failed");
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="page-content">
        <section className="todo-list-card">
          <div className="list-header">
            <div>
              <h3>Upcoming Todos</h3>
              <p className="small-text">Find Your Latest Upcoming ToDos</p>
            </div>

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

          <AlertMessage message={error} />

          {editingTodo && (
            <form className="edit-form" onSubmit={handleUpdate}>
              <h3>Edit Todo</h3>

              <input
                type="text"
                placeholder="Todo title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <textarea
                placeholder="Todo description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <input
                type="date"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />

              <input
                type="time"
                value={formData.due_time}
                onChange={(e) =>
                  setFormData({ ...formData, due_time: e.target.value })
                }
              />

              <button type="submit">Update Todo</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditingTodo(null)}
              >
                Cancel
              </button>
            </form>
          )}

          {todos.length === 0 ? (
            <p className="empty-text">No todos found</p>
          ) : (
            <div className="todo-grid">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEdit}
                  onDelete={setDeleteId}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this todo?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;