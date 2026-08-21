import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rescheduleBooking } from "../api/bookingApi";

export function useRescheduleBooking(options = {}) {
  const client = useQueryClient();
  return useMutation({ mutationFn: rescheduleBooking, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["bookings"] }); client.invalidateQueries({ queryKey: ["dashboard"] }); options.onSuccess?.(...args); } });
}
