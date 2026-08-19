import { prisma } from "../config/db.js";
export const bookingModel = (serviceId, userId, startTime, endTime, reason) =>
  prisma.booking.create({
    data: { serviceId, userId, startTime, endTime, reason, status: "PENDING" },
  });
export const bookingUpdate = (id, status) =>
  prisma.booking.update({ where: { id }, data: { status } });
export const bookingCompleted = (id) => bookingUpdate(id, "COMPLETED");
