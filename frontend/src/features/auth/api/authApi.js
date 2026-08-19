import { apiClient } from "../../../services/apiClient";

export async function login(credentials) {
  const response = await apiClient.post("/login", credentials);
  return response.data;
}

export async function register(user) {
  const response = await apiClient.post("/signup", user);
  return response.data;
}

export async function forgotPassword({ email }) {
  const response = await apiClient.post("/forgot-password", { email });
  return response.data;
}

export async function resetPassword({ token, newPassword }) {
  const response = await apiClient.post("/reset-password", {
    token,
    newPassword,
  });
  return response.data;
}

export async function logout({ userId }) {
  const response = await apiClient.post("/logout", { userId });
  return response.data;
}

export async function refreshToken({ refreshToken }) {
  const response = await apiClient.post("/new-access-token", {
    refreshToken,
  });
  return response.data;
}
