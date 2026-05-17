import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import AlertMessage from "../components/AlertMessage";

function PastTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const fetchPastTodos = async () => {
    try {
      const response = await api.get("/todos?view=past");
      setTodos(response.data);
    } catch {
      setError("Failed to load completed todos");
    }
  };

  useEffect(() => {
    fetchPastTodos();
  }, []);

  const handleStatusChange = async (todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date?.slice(0, 10),
        due_time: todo.due_time,
        status: "pending",
      });

      fetchPastTodos();
    } catch {
      setError("Status update failed");
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="page-content">
        <section className="todo-list-card">
          <h3>Completed Todos</h3>
          <p className="small-text">All completed tasks are shown here</p>

          <AlertMessage message={error} />

          {todos.length === 0 ? (
            <p className="empty-text">No completed todos found</p>
          ) : (
            <div className="todo-grid">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default PastTodos;