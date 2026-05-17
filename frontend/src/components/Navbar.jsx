import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar d-flex justify-content-between align-items-center">
      <div>
        <h2 className="mb-1">Todo Manager</h2>
        <p>Hello, {user?.name}</p>
      </div>

      <div className="nav-links">
        <Link className="nav-btn dashboard-btn" to="/dashboard">
          Dashboard
        </Link>

        <Link className="nav-btn add-btn" to="/add-todo">
          Add
        </Link>

        <Link className="nav-btn completed-btn" to="/past-todos">
          Completed
        </Link>

        <button className="nav-btn logout-small" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;