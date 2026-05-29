import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyRequests, updateRequestStatus } from "../api/requests";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/authStore";
import { jwtDecode } from "jwt-decode";

const Requests = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const currentUser = token ? jwtDecode(token) : null;

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getMyRequests("all"),
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  const handleStatusUpdate = (id, status) => {
    mutation.mutate({ id, status });
  };

  const receivedRequests = requests.filter(
    (req) => req.receiver._id === currentUser?.id
  );
  const sentRequests = requests.filter(
    (req) => req.sender._id === currentUser?.id
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Manage Requests</h1>

        {isLoading ? (
          <p>Loading requests...</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-700">Received</h2>
              <div className="space-y-4">
                {receivedRequests.length === 0 ? (
                  <p className="text-sm text-slate-500">No requests received yet.</p>
                ) : (
                  receivedRequests.map((req) => (
                    <article key={req._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900">{req.sender.name}</p>
                          <p className="text-sm text-slate-500">wants to learn: <span className="font-semibold text-slate-700">{req.skill}</span></p>
                          {req.message && <p className="mt-2 text-sm italic text-slate-600">"{req.message}"</p>}
                        </div>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                          req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      {req.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(req._id, "accepted")}
                            className="rounded bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-700 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req._id, "rejected")}
                            className="rounded border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </article>
                  ))
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-700">Sent</h2>
              <div className="space-y-4">
                {sentRequests.length === 0 ? (
                  <p className="text-sm text-slate-500">You haven't sent any requests.</p>
                ) : (
                  sentRequests.map((req) => (
                    <article key={req._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900">To: {req.receiver.name}</p>
                          <p className="text-sm text-slate-500">Skill: {req.skill}</p>
                        </div>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                          req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default Requests;
