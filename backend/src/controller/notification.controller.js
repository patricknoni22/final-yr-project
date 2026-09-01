import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";

export async function getNotifications(req, res, next) {
  try {
    const take = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const where = { userId: req.user.userId };
    const [items, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * take, take }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { ...where, isRead: false } }),
    ]);
    responseHandler(res, 200, "Notifications retrieved", { items, unreadCount, page, total, hasMore: page * take < total });
  } catch (err) { next(err); }
}

export async function getUnreadCount(req, res, next) {
  try { responseHandler(res, 200, "Unread count retrieved", { unreadCount: await prisma.notification.count({ where: { userId: req.user.userId, isRead: false } }) }); } catch (err) { next(err); }
}

export async function markAllNotificationsRead(req, res, next) {
  try { const result = await prisma.notification.updateMany({ where: { userId: req.user.userId, isRead: false }, data: { isRead: true } }); responseHandler(res, 200, "All notifications marked as read", result); } catch (err) { next(err); }
}

export async function registerPushToken(req, res, next) {
  try {
    const { token, platform } = req.body;
    if (!token || !/^ExponentPushToken\[.+\]$|^ExpoPushToken\[.+\]$/.test(token)) return res.status(400).json({ message: "A valid Expo push token is required" });
    const item = await prisma.pushToken.upsert({ where: { token }, update: { userId: req.user.userId, platform }, create: { token, platform, userId: req.user.userId } });
    responseHandler(res, 200, "Push token registered", item);
  } catch (err) { next(err); }
}

export async function unregisterPushToken(req, res, next) {
  try { await prisma.pushToken.deleteMany({ where: { token: req.body.token, userId: req.user.userId } }); responseHandler(res, 200, "Push token removed"); } catch (err) { next(err); }
}

export async function markNotificationRead(req, res, next) {
  try {
    const item = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ message: "Notification not found" });
    if (item.userId !== req.user.userId) return res.status(403).json({ message: "Unauthorized" });
    responseHandler(res, 200, "Notification marked as read", await prisma.notification.update({ where: { id: item.id }, data: { isRead: true } }));
  } catch (err) { next(err); }
}
