import { apiClient } from "../../../services/apiClient";

export const getNotifications = async () =>
  (await apiClient.get("/notifications")).data.data;
export const markNotificationAsRead = async (id) =>
  (await apiClient.put(`/notifications/${id}/read`)).data.data;
export const getUnreadCount = async () =>
  (await apiClient.get("/notifications/unread-count")).data.data;
export const markAllNotificationsAsRead = async () =>
  (await apiClient.put("/notifications/read-all")).data.data;
export const registerPushToken = async (payload) =>
  (await apiClient.post("/notifications/push-token", payload)).data.data;
export const unregisterPushToken = async (token) =>
  (await apiClient.delete("/notifications/push-token", { data: { token } }))
    .data.data;
