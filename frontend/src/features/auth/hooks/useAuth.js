import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
} from "../api/authApi";
import {
  clearAuthSession,
  getAuthSession,
  getUserIdFromToken,
  setAuthSession,
} from "../utils/authStorage";

export function useLogin(options = {}) {
  return useMutation({
    mutationFn: login,
    ...options,
    onSuccess: (response, variables, context) => {
      const tokens = response.data?.tokens;
      if (tokens) {
        setAuthSession({
          ...tokens,
          userId: response.data?.user?.id ?? getUserIdFromToken(tokens.accessToken),
        });
      }
      options.onSuccess?.(response, variables, context);
    },
  });
}

export function useRegister(options = {}) {
  return useMutation({ mutationFn: register, ...options });
}

export function useForgotPassword(options = {}) {
  return useMutation({ mutationFn: forgotPassword, ...options });
}

export function useResetPassword(options = {}) {
  return useMutation({ mutationFn: resetPassword, ...options });
}

export function useLogout(options = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId } = {}) => {
      const resolvedUserId = userId ?? getAuthSession()?.userId;
      return resolvedUserId ? logout({ userId: resolvedUserId }) : Promise.resolve();
    },
    ...options,
    onSettled: (data, error, variables, context) => {
      clearAuthSession();
      queryClient.clear();
      options.onSettled?.(data, error, variables, context);
    },
  });
}

export function useRefreshToken(options = {}) {
  return useMutation({
    mutationFn: ({ refreshToken: token } = {}) =>
      refreshToken({ refreshToken: token ?? getAuthSession()?.refreshToken }),
    ...options,
    onSuccess: (response, variables, context) => {
      const auth = getAuthSession();
      if (auth && response.data?.accessToken) {
        setAuthSession({ ...auth, accessToken: response.data.accessToken });
      }
      options.onSuccess?.(response, variables, context);
    },
  });
}
