import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getMyProfile, updateMyProfile } from "../api/profileApi";

export const useMyProfile = () => useQuery({ queryKey: ["profile", "me"], queryFn: getMyProfile });
export function useUpdateMyProfile(options = {}) { const client = useQueryClient(); return useMutation({ mutationFn: updateMyProfile, ...options, onSuccess: (data, ...args) => { client.setQueryData(["profile", "me"], data); options.onSuccess?.(data, ...args); } }); }
export const useChangePassword = (options = {}) => useMutation({ mutationFn: changePassword, ...options });
