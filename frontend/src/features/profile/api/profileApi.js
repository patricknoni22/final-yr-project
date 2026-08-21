import { apiClient } from "../../../services/apiClient";

export const getMyProfile = async () => (await apiClient.get("/me")).data.data;
export const updateMyProfile = async (data) => (await apiClient.patch("/me", data)).data.data;
export const changePassword = async (data) => (await apiClient.post("/changePassword", data)).data;
