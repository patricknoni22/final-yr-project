import { useQuery } from "@tanstack/react-query";
import { getAvailability } from "../api/availabilityApi";

export const useAvailability = (lecturerId) => useQuery({ queryKey: ["availability", lecturerId || "me"], queryFn: () => getAvailability(lecturerId) });
