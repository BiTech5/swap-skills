import api from "./api";

export const createRequest = async (payload) => {
  const response = await api.post("/requests", payload);
  return response.data;
};

export const getMyRequests = async (direction = "all") => {
  const response = await api.get("/requests", { params: { direction } });
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.patch(`/requests/${id}`, { status });
  return response.data;
};
