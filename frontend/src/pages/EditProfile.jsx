import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { useUserProfile } from "../api/userProfile";
import api from "../api/api";
import { API_URLS } from "../api/apiRoutes";

const normalizeSkills = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
};

const EditProfile = () => {
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [offeredInput, setOfferedInput] = useState("");
  const [wantedInput, setWantedInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userProfile) return;

    setName(userProfile.name || "");
    setEmail(userProfile.email || "");
    setBio(userProfile.bio || "");
    setSkillsOffered(normalizeSkills(userProfile.skillsoffered));
    setSkillsWanted(normalizeSkills(userProfile.skillswanted));
  }, [userProfile]);

  const addTag = (value, tags, setTags, setInput) => {
    const trimmed = value.trim().replace(/,+$/, "");
    if (!trimmed) return;
    const nextTag = trimmed.toLowerCase();
    if (tags.some((tag) => tag.toLowerCase() === nextTag)) {
      setInput("");
      return;
    }

    setTags([...tags, trimmed]);
    setInput("");
  };

  const handleKeyDown = (event, inputValue, setInputValue, tags, setTags) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue, tags, setTags, setInputValue);
    }

    if (event.key === "Backspace" && !inputValue && tags.length) {
      event.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index, tags, setTags) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const updateProfile = async (payload) => {
    const response = await api.patch(API_URLS.USER, payload);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setMessage("Profile updated successfully.");
    },
    onError: (error) => {
      setMessage(error?.response?.data || "Unable to update profile.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    mutation.mutate({
      name,
      bio,
      skillsoffered: skillsOffered,
      skillswanted: skillsWanted,
    });
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="skillsoffered" className="block text-sm/6 font-medium text-gray-900">
                  Skills Offered
                </label>
                <div className="mt-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {skillsOffered.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-900"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeTag(index, skillsOffered, setSkillsOffered)}
                          className="rounded-full bg-indigo-200 px-1 text-xs text-indigo-700 hover:bg-indigo-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    id="skillsoffered"
                    type="text"
                    name="skillsoffered"
                    autoComplete="off"
                    value={offeredInput}
                    onChange={(event) => setOfferedInput(event.target.value)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, offeredInput, setOfferedInput, skillsOffered, setSkillsOffered)
                    }
                    placeholder="Add a skill and press Enter"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="skillswanted" className="block text-sm/6 font-medium text-gray-900">
                  Skills Wanted
                </label>
                <div className="mt-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {skillsWanted.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-900"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeTag(index, skillsWanted, setSkillsWanted)}
                          className="rounded-full bg-slate-200 px-1 text-xs text-slate-700 hover:bg-slate-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    id="skillswanted"
                    type="text"
                    name="skillswanted"
                    autoComplete="off"
                    value={wantedInput}
                    onChange={(event) => setWantedInput(event.target.value)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, wantedInput, setWantedInput, skillsWanted, setSkillsWanted)
                    }
                    placeholder="Add a skill and press Enter"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="bio" className="block text-sm/6 font-medium text-gray-900">
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>

          {message ? <p className="mt-4 text-sm text-indigo-700">{message}</p> : null}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
