import { prisma } from "../config/db.js";

async function sendExpoPush(tokens, notification) {
  if (!tokens.length) return false;
  const messages = tokens.map(({ token }) => ({
    to: token,
    sound: "default",
    title: notification.title,
    body: notification.message,
    data: { notificationId: notification.id, bookingId: notification.bookingId, type: notification.type },
  }));
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(messages),
  });
  if (!response.ok) throw new Error(`Expo push failed with ${response.status}`);
  return true;
}

export async function createNotification({ userId, title, message, type, bookingId, reminderKey }) {
  if (reminderKey) {
    const existing = await prisma.notification.findFirst({ where: { reminderKey } });
    if (existing) return existing;
  }
  const notification = await prisma.notification.create({
    data: { userId, title, message, type, bookingId, reminderKey },
  });
  try {
    const tokens = await prisma.pushToken.findMany({ where: { userId } });
    if (await sendExpoPush(tokens, notification)) {
      await prisma.notification.update({ where: { id: notification.id }, data: { pushSent: true } });
    }
  } catch (error) {
    console.error("Push notification delivery failed:", error.message);
  }
  return notification;
}

export async function processAppointmentReminders() {
  const now = new Date();
  const soon = new Date(now.getTime() + 30 * 60 * 1000);
  const bookings = await prisma.booking.findMany({
    where: { status: "CONFIRMED", startTime: { gt: now, lte: soon } },
    include: { service: true },
  });
  for (const booking of bookings) {
    for (const userId of [booking.userId, booking.service.userId]) {
      const reminderKey = `${booking.id}:${userId}:30m`;
      try {
        await createNotification({ userId, bookingId: booking.id, reminderKey, type: "BOOKING_REMINDER", title: "Appointment starts soon", message: "Your consultation starts within 30 minutes." });
      } catch (error) { console.error("Reminder creation failed:", error.message); }
    }
  }
}
