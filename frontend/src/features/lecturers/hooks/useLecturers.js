import { useQuery } from "@tanstack/react-query";
import { getLecturers } from "../api/lecturerApi";

export const useLecturers = (params = {}) => useQuery({ queryKey: ["lecturers", params], queryFn: () => getLecturers(params) });
