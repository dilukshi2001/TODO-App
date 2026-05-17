import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTodo from "./pages/AddTodo";
import PastTodos from "./pages/PastTodos";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-todo"
        element={
          <ProtectedRoute>
            <AddTodo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/past-todos"
        element={
          <ProtectedRoute>
            <PastTodos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;