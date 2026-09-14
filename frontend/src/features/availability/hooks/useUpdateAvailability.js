import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replaceAvailability } from "../api/availabilityApi";

export function useUpdateAvailability(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: replaceAvailability, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["availability"] }); client.invalidateQueries({ queryKey: ["lecturers"] }); options.onSuccess?.(...args); } }); }
