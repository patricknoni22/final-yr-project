import express from "express";
import { getNotifications, getUnreadCount, markAllNotificationsRead, markNotificationRead, registerPushToken, unregisterPushToken } from "../controller/notification.controller.js";
import { authenticationToken } from "../middleware/authMiddleware.js";

export const notificationRouter = express.Router();
notificationRouter.get("/notifications", authenticationToken, getNotifications);
notificationRouter.get("/notifications/unread-count", authenticationToken, getUnreadCount);
notificationRouter.put("/notifications/read-all", authenticationToken, markAllNotificationsRead);
notificationRouter.put("/notifications/:id/read", authenticationToken, markNotificationRead);
notificationRouter.post("/notifications/push-token", authenticationToken, registerPushToken);
notificationRouter.delete("/notifications/push-token", authenticationToken, unregisterPushToken);
