import api from "./api";
import { API_URLS } from "./apiRoutes";

export const registerUser = async (payload) => {
  const response = await api.post(API_URLS.AUTH.REGISTER, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post(API_URLS.AUTH.LOGIN, payload);
  return response.data;
};
