import api from "./api";
import { API_URLS } from "./apiRoutes";
import { useQuery } from "@tanstack/react-query";

export const getUserProfile = async () => {
  const response = await api.get(API_URLS.USER);
  return response.data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });
};
