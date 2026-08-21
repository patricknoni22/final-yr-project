import { apiClient } from "../../../services/apiClient";

export const getAvailability = async (lecturerId) => (await apiClient.get(lecturerId ? `/availability/${lecturerId}` : "/availability")).data.data;
export const replaceAvailability = async (data) => (await apiClient.put("/availability", data)).data.data;
