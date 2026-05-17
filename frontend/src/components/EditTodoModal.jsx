function EditTodoModal({
  formData,
  setFormData,
  onUpdate,
  onCancel,
}) {
  return (
    <div className="modal-overlay">
      <div className="edit-modal-box">
        <h3 className="mb-3">Edit Todo</h3>

        <form
          onSubmit={onUpdate}
          className="d-flex flex-column gap-3"
        >
          <div>
            <label className="form-label fw-semibold">
              Todo Title
            </label>

            <input
              className="form-control py-2"
              type="text"
              placeholder="Enter todo title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form-label fw-semibold">
              Description
            </label>

            <textarea
              className="form-control py-2"
              placeholder="Enter todo description"
              value={formData.description}
              rows="4"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form-label fw-semibold">
              Due Date
            </label>

            <input
              className="form-control py-2"
              type="date"
              value={formData.due_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  due_date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form-label fw-semibold">
              Due Time
            </label>

            <input
              className="form-control py-2"
              type="time"
              value={formData.due_time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  due_time: e.target.value,
                })
              }
            />
          </div>

          <div className="form-buttons mt-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update Todo
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;