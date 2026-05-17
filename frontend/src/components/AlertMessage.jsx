function AlertMessage({ type = "error", message }) {
  if (!message) return null;

  return (
    <div
      className={`alert ${
        type === "success"
          ? "alert-success"
          : "alert-danger"
      }`}
    >
      {message}
    </div>
  );
}

export default AlertMessage;