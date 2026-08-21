import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../api/departmentApi";

export const useDepartments = () => useQuery({ queryKey: ["departments"], queryFn: getDepartments });
