import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import useAuthStore from "../store/authStore";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      console.log(data);
      const token = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (token) {
        login(token, refreshToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-200">
        <div className="px-8 py-10 sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue to Swap Skills</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 text-slate-700 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700 cursor-pointer">Forgot password?</button>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
            >
              Sign in
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-slate-500">
            Don’t have an account? <Link className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer" to={"/register"}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
