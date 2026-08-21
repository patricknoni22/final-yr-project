import { useQuery } from "@tanstack/react-query";
import { getLecturer } from "../api/lecturerApi";

export const useLecturerDetails = (id) => useQuery({ queryKey: ["lecturers", id], queryFn: () => getLecturer(id), enabled: Boolean(id) });
