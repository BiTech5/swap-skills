import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useUserProfile } from "../api/userProfile";

const Home = () => {
  const { data: userProfile, isPending, error } = useUserProfile();
  const profile = userProfile;
  console.log(userProfile)
  const displayName =
    profile?.name || profile?.fullName || profile?.username || profile?.email || "User";

  const stats = [
    { label: "Skills Offered", value: profile?.skillsoffered.length },
    { label: "Skills Wanted", value: profile?.skillswanted.length },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-6">
          <h1 className="text-xl font-bold">Dashboard</h1><br />
          <section className="mb-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="rounded-lg bg-slate-50 p-3">
                  You received a React mentoring request from Aayush.
                </li>
                <li className="rounded-lg bg-slate-50 p-3">
                  Your UI/UX swap session with Sita is scheduled for tomorrow.
                </li>
                <li className="rounded-lg bg-slate-50 p-3">
                  New match found: Node.js for Public Speaking.
                </li>
              </ul>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-4 flex flex-col gap-3">
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 cursor-pointer">
                  Create Skill Post
                </button>
                <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 cursor-pointer">
                  View Requests
                </button>
                <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 cursor-pointer">
                  Edit Profile
                </button>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
