import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../api/notificationApi";

export function useMarkNotificationAsRead(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: markNotificationAsRead, ...options, onSuccess: (...args) => { client.invalidateQueries({ queryKey: ["notifications"] }); options.onSuccess?.(...args); } }); }
