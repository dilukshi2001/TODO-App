function AlertMessage({ type = "error", message }) {
  if (!message) return null;

  return <div className={`${type}-box`}>{message}</div>;
}

export default AlertMessage;