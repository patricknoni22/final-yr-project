import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../api/bookingApi";

export const useBookingDetails = (id) => useQuery({ queryKey: ["bookings", id], queryFn: () => getBooking(id), enabled: Boolean(id) });
