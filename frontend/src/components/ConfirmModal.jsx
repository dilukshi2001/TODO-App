function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="mb-3">Confirm Action</h3>

        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>

          <button className="btn btn-secondary" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;