function TodoCard({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div
      className={`todo-card ${
        todo.status === "completed"
          ? "completed-card"
          : ""
      }`}
    >
      <div className="todo-card-header">
        <h4>{todo.title}</h4>

        <span className={`status ${todo.status}`}>
          {todo.status}
        </span>
      </div>

      <p>
        {todo.description ||
          "No description added"}
      </p>

      <p className="todo-date">
        Due: {todo.due_date?.slice(0, 10)} at{" "}
        {todo.due_time?.slice(0, 5)}
      </p>

      <div className="todo-actions">

        <button
          className="btn btn-primary"
          onClick={() =>
            onStatusChange(todo)
          }
        >
          {todo.status === "completed"
            ? "Mark Pending"
            : "Mark Completed"}
        </button>

        {/* Show edit button only for pending todos */}
        {todo.status !== "completed" && (
          <button
            className="btn btn-warning text-white"
            onClick={() => onEdit(todo)}
          >
            Edit
          </button>
        )}

        <button
          className="btn btn-danger"
          onClick={() =>
            onDelete(todo.id)
          }
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TodoCard;