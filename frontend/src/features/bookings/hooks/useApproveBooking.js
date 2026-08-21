import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveBooking } from "../api/bookingApi";

export function useApproveBooking(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: approveBooking, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["bookings"] }); client.invalidateQueries({ queryKey: ["dashboard"] }); options.onSuccess?.(...args); } }); }
