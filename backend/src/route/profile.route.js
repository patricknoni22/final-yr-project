import express from "express";
import { getDepartments, getLecturer, getLecturers, getMe, getStudent, getStudents, updateMe } from "../controller/profile.controller.js";
import { authenticationToken, roleMiddleware } from "../middleware/authMiddleware.js";

export const profileRouter = express.Router();
profileRouter.get("/me", authenticationToken, getMe);
profileRouter.patch("/me", authenticationToken, updateMe);
profileRouter.get("/lecturers", getLecturers);
profileRouter.get("/lecturers/:id", getLecturer);
profileRouter.get("/students", authenticationToken, roleMiddleware("LECTURER"), getStudents);
profileRouter.get("/students/:id", authenticationToken, roleMiddleware("LECTURER"), getStudent);
profileRouter.get("/departments", getDepartments);
