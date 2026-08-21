import { apiClient } from "../../../services/apiClient";

export const getBookings = async () => (await apiClient.get("/bookings")).data.data;
export const getBooking = async (id) => (await apiClient.get(`/booking/${id}`)).data.data;
export const createBooking = async (data) => (await apiClient.post("/booking", data)).data.data;
export const approveBooking = async (id) => (await apiClient.put(`/booking/${id}/accept`)).data.data;
export const rejectBooking = async (id) => (await apiClient.put(`/booking/${id}/reject`)).data.data;
export const cancelBooking = async (id) => (await apiClient.put(`/booking/${id}/cancel`)).data.data;
export const rescheduleBooking = async ({ id, ...data }) => (await apiClient.put(`/booking/${id}/reschedule`, data)).data.data;
