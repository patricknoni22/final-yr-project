import { apiClient } from "../../../services/apiClient";

export const getNotifications = async () => (await apiClient.get("/notifications")).data.data;
export const markNotificationAsRead = async (id) => (await apiClient.put(`/notifications/${id}/read`)).data.data;
