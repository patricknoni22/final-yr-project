import { useQuery } from "@tanstack/react-query";
import { getLecturerDashboard, getStudentDashboard } from "../api/dashboardApi";

export const useStudentDashboard = () => useQuery({ queryKey: ["dashboard", "student"], queryFn: getStudentDashboard });
export const useLecturerDashboard = () => useQuery({ queryKey: ["dashboard", "lecturer"], queryFn: getLecturerDashboard });
