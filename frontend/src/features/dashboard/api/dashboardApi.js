import { apiClient } from "../../../services/apiClient";

export const getStudentDashboard = async () => (await apiClient.get("/dashboard/student")).data.data;
export const getLecturerDashboard = async () => (await apiClient.get("/dashboard/lecturer")).data.data;
export const getCalendar = async ({ serviceId, startDate, endDate }) => (await apiClient.get(`/dashboard/calendar/${serviceId}`, { params: { startDate, endDate } })).data.data;
