import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../api/bookingApi";

export function useCancelBooking(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: cancelBooking, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["bookings"] }); client.invalidateQueries({ queryKey: ["dashboard"] }); client.invalidateQueries({ queryKey: ["lecturers"] }); options.onSuccess?.(...args); } }); }
