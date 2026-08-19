import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";

export async function getNotifications(req, res, next) {
  try { responseHandler(res, 200, "Notifications retrieved", await prisma.notification.findMany({ where: { userId: req.user.userId }, orderBy: { createdAt: "desc" } })); } catch (err) { next(err); }
}

export async function markNotificationRead(req, res, next) {
  try {
    const item = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ message: "Notification not found" });
    if (item.userId !== req.user.userId) return res.status(403).json({ message: "Unauthorized" });
    responseHandler(res, 200, "Notification marked as read", await prisma.notification.update({ where: { id: item.id }, data: { isRead: true } }));
  } catch (err) { next(err); }
}
