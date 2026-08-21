import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../api/studentApi";

export const useStudentDetails = (id) => useQuery({ queryKey: ["students", id], queryFn: () => getStudent(id), enabled: Boolean(id) });
