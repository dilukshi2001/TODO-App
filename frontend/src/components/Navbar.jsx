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
    <nav className="navbar">
      <div>
        <h2>Todo Manager</h2>
        <p>Hello, {user?.name}</p>
      </div>

      <div className="nav-links">
        <Link className="nav-btn dashboard-btn" to="/dashboard" title="Dashboard">
           <span>Dashboard</span>
        </Link>

        <Link className="nav-btn add-btn" to="/add-todo" title="Add Todo">
           <span>Add</span>
        </Link>

        <Link className="nav-btn completed-btn" to="/past-todos" title="Completed Todos">
           <span>Completed</span>
        </Link>

        <button className="nav-icon-btn logout-small" onClick={handleLogout}>
           <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;