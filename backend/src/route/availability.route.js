import express from "express";
import { getAvailability, replaceAvailability } from "../controller/availability.controller.js";
import { authenticationToken, roleMiddleware } from "../middleware/authMiddleware.js";

export const availabilityRouter = express.Router();
availabilityRouter.get("/availability/:lecturerId", getAvailability);
availabilityRouter.get("/availability", authenticationToken, roleMiddleware("LECTURER"), getAvailability);
availabilityRouter.put("/availability", authenticationToken, roleMiddleware("LECTURER"), replaceAvailability);
