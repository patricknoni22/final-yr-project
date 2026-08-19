import express from "express";
import { getNotifications, markNotificationRead } from "../controller/notification.controller.js";
import { authenticationToken } from "../middleware/authMiddleware.js";

export const notificationRouter = express.Router();
notificationRouter.get("/notifications", authenticationToken, getNotifications);
notificationRouter.put("/notifications/:id/read", authenticationToken, markNotificationRead);
