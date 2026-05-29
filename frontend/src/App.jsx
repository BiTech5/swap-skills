import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Requests from "./pages/Requests";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
      path="/search"
      element={
        <ProtectedRoute>
          <Search/>
        </ProtectedRoute>
      }/>
      <Route
      path="/requests"
      element={
        <ProtectedRoute>
          <Requests/>
        </ProtectedRoute>
      }/>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
      />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
    } />
    </Routes>
  );
};

export default App;
