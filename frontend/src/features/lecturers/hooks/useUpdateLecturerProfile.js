import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../api/lecturerApi";

export function useUpdateLecturerProfile(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: updateMyProfile, ...options, onSuccess: (data, variables, context) => { queryClient.setQueryData(["profile", "me"], data); options.onSuccess?.(data, variables, context); } });
}
