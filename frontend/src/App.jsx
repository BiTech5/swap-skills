import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Profile";
import Search from "./pages/Search";
import Requests from "./pages/Requests";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
const App = () => {
  return (
    <Routes>
      <Route
        path="/profile"
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
      <Route path="/edit-profile" element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
