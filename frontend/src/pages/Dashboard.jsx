import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import AlertMessage from "../components/AlertMessage";
import ConfirmModal from "../components/ConfirmModal";
import EditTodoModal from "../components/EditTodoModal";

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
      const response = await api.get(
        `/todos?search=${search}&status=${status}`
      );

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

    if (!formData.title || !formData.due_date || !formData.due_time) {
      setError("Title, date and time are required");
      return;
    }

    try {
      await api.put(`/todos/${editingTodo.id}`, {
        ...formData,
        status: editingTodo.status,
      });

      setEditingTodo(null);

      setFormData({
        title: "",
        description: "",
        due_date: "",
        due_time: "",
      });

      fetchTodos();
    } catch {
      setError("Todo update failed");
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);

    setFormData({
      title: "",
      description: "",
      due_date: "",
      due_time: "",
    });
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
    const newStatus =
      todo.status === "completed" ? "pending" : "completed";

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

              <p className="small-text">
                Find your latest upcoming tasks
              </p>
            </div>

            <div className="filters">
              <input
                className="form-control"
                type="text"
                placeholder="Search todo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <AlertMessage message={error} />

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

      {editingTodo && (
        <EditTodoModal
          formData={formData}
          setFormData={setFormData}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}

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