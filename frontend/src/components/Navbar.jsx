import useAuthStore from "../store/authStore";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">SkillSwap</h1>
      <button className="border px-4 py-2 rounded cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}


export default Navbar;