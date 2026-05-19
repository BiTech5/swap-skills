import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import Navbar from "../components/Navbar";
const Search = () => {
  const [skill, setSkill] = useState("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["search-users"],
    queryFn: async () => {
      const res = await api.get(`/search?skill=${skill}`);
      return res.data;
    },
    enabled: false,
  });
  const handleSearch = () => {
    if (!skill.trim()) return;
    refetch();
  };
  return (
    <>
      <Navbar />
      <div className="p-5">
        <div>
            <input type="text" />
            <button>Search</button>
        </div>
        {!isLoading &&(
            <p>Loading...</p>
        )}

        <div>
            {data?.map((user)=>{
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                    <div>
                        {user.skillsOffered?.map(skill=>{
                            <span>{skill}</span>
                        })}
                    </div>
                </div>
            })}
        </div>
      </div>
    </>
  );
};

export default Search;
