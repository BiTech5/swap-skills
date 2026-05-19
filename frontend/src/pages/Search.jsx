import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import Navbar from "../components/Navbar";

const Search = () => {
  const [skill, setSkill] = useState("");

  const { data = [], refetch, isFetching, error } = useQuery({
    queryKey: ["search-users"],
    queryFn: async () => {
      const res = await api.get("/search", {
        params: { skill: skill.trim() },
      });
      return res.data;
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!skill.trim()) return;
    refetch();
  };

  const hasSearched = data.length > 0 || error || isFetching;

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <section className="mb-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-500">Find skill partners</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Search skills</h1>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
                placeholder="Search for React, design, public speaking..."
                className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
              <button
                className="min-h-11 rounded-md bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                onClick={handleSearch}
                disabled={!skill.trim() || isFetching}
              >
                {isFetching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Search failed. Please try again.
          </div>
        )}

        {isFetching && (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
            Searching for skill partners...
          </div>
        )}

        {!isFetching && hasSearched && data.length === 0 && !error && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">No matches found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try a broader skill name or check the spelling.
            </p>
          </div>
        )}

        {!isFetching && data.length > 0 && (
          <section className="grid gap-4 md:grid-cols-2">
            {data.map((user) => (
              <article
                key={user._id || user.id || user.email}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {user.name || "Unnamed user"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {user.bio || "No bio added yet."}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                    Skills offered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(user.skillsOffered || user.skillsoffered || []).length > 0 ? (
                      (user.skillsOffered || user.skillsoffered).map((offeredSkill) => (
                        <span
                          key={offeredSkill}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {offeredSkill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No skills listed.</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {!hasSearched && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900">Start with a skill</h2>
            <p className="mt-2 text-sm text-slate-500">
              Search by the skill you want to learn or exchange.
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
