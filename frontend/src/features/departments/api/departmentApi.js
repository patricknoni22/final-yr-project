import { apiClient } from "../../../services/apiClient";

export const getDepartments = async () => (await apiClient.get("/departments")).data.data;
