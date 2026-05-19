import useAuthStore from "../store/authStore";
import { NavLink } from "react-router-dom";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-xl font-bold text-slate-900">
          SkillSwap
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Search
          </NavLink>
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}


export default Navbar;
