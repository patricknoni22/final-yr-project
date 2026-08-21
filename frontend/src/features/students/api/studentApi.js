import { apiClient } from "../../../services/apiClient";

export const getStudents = async () => (await apiClient.get("/students")).data.data;
export const getStudent = async (id) => (await apiClient.get(`/students/${id}`)).data.data;
export const getMyProfile = async () => (await apiClient.get("/me")).data.data;
export const updateMyProfile = async (data) => (await apiClient.patch("/me", data)).data.data;
