import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../api/bookingApi";

export function useCreateBooking(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: createBooking, ...options, onSuccess: (data, variables, context) => { client.invalidateQueries({ queryKey: ["bookings"] }); client.invalidateQueries({ queryKey: ["dashboard"] }); client.invalidateQueries({ queryKey: ["lecturers"] }); options.onSuccess?.(data, variables, context); } }); }
