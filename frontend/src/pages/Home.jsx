import Navbar from "../components/Navbar";
import { useUserProfile } from "../api/userProfile";
import { useNotifications } from "../api/notifications";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
  const { data: notifications = [], isLoading: isNotificationsLoading } = useNotifications();

  const stats = [
    { label: "Skills Offered", value: userProfile?.skillsoffered?.length || 0 },
    { label: "Skills Wanted", value: userProfile?.skillswanted?.length || 0 },
  ];

  return (
    <div>
      <Navbar />
        <main className="mx-auto w-full max-w-6xl p-6">
          <h1 className="text-xl font-bold">Dashboard</h1><br />
          <section className="mb-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {isProfileLoading ? "..." : item.value}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {isNotificationsLoading ? (
                  <p>Loading activity...</p>
                ) : notifications.length === 0 ? (
                  <p className="text-slate-500 italic">No recent activity found.</p>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <li key={notification._id} className={`rounded-lg p-3 ${notification.isRead ? 'bg-slate-50' : 'bg-blue-50 border-l-4 border-blue-400'}`}>
                      {notification.message}
                    </li>
                  ))
                )}
              </ul>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/search" className="rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-700">
                  Find Skill Partners
                </Link>
                <Link to="/requests" className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                  View Requests
                </Link>
                <Link to="/edit-profile"  className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                  Edit Profile
                </Link>
              </div>
            </article>
          </section>
        </main>
    </div>
  );
};

export default Home;
