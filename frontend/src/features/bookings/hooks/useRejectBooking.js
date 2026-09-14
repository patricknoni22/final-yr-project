import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectBooking } from "../api/bookingApi";

export function useRejectBooking(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: rejectBooking, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["bookings"] }); client.invalidateQueries({ queryKey: ["dashboard"] }); client.invalidateQueries({ queryKey: ["lecturers"] }); options.onSuccess?.(...args); } }); }
