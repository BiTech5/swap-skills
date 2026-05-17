import { NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-64 min-h-screen p-4 border-r">
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className="border px-4 py-2 rounded hover:bg-gray-50 transition-colors"
        >
          Dashboard
        </NavLink>
        <button
          className="border px-4 py-2 rounded cursor-pointer text-left hover:bg-gray-50 transition-colors"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
