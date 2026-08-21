import { apiClient } from "../../../services/apiClient";

export const getLecturers = async (params = {}) => (await apiClient.get("/lecturers", { params })).data.data;
export const getLecturer = async (id) => (await apiClient.get(`/lecturers/${id}`)).data.data;
export const getMyProfile = async () => (await apiClient.get("/me")).data.data;
export const updateMyProfile = async (data) => (await apiClient.patch("/me", data)).data.data;
