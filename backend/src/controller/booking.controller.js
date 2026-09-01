import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";
import { bookingModel, bookingUpdate } from "../model/booking.model.js";
import { createNotification } from "../services/notification.service.js";

const bookingInclude = {
  user: { select: { id: true, username: true, studentId: true, imageUrl: true } },
  service: { include: { user: { select: { id: true, username: true, title: true, department: true, office: true, imageUrl: true } } } }
};

export async function booking(req, res, next) {
  const { lecturerId, startTime, endTime, reason } = req.body;
  let { serviceId } = req.body;
  try {
    if (!serviceId && lecturerId) serviceId = (await prisma.service.findFirst({ where: { userId: lecturerId } }))?.id;
    if (!serviceId || !startTime || !endTime) return res.status(400).json({ message: "Lecturer/service and start/end times are required" });
    const service = await prisma.service.findUnique({ where: { id: serviceId }, include: { availability: true } });
    if (!service) return res.status(404).json({ message: "Service not found" });
    const start = new Date(startTime); const end = new Date(endTime);
    if (start >= end) return res.status(400).json({ message: "End time must be after start time" });
    if ((end - start) / 60000 > service.duration) return res.status(400).json({ message: `Booking cannot exceed ${service.duration} minutes` });
    const slot = service.availability.find((item) => item.dayOfWeek === start.getDay());
    if (!slot) return res.status(400).json({ message: "Lecturer is unavailable on this day" });
    const startClock = start.toTimeString().slice(0, 5); const endClock = end.toTimeString().slice(0, 5);
    if (startClock < slot.startTime || endClock > slot.endTime) return res.status(400).json({ message: "Requested time is outside availability" });
    const overlap = await prisma.booking.findFirst({ where: { serviceId, status: { not: "CANCELLED" }, startTime: { lt: end }, endTime: { gt: start } } });
    if (overlap) return res.status(409).json({ message: "Time slot already booked" });
    const item = await bookingModel(serviceId, req.user.userId, start, end, reason);
    await createNotification({ userId: service.userId, bookingId: item.id, title: "New booking request", message: "A student requested an appointment", type: "BOOKING_CREATED" });
    responseHandler(res, 201, "Booking created successfully", item);
  } catch (err) { next(err); }
}

export async function getBookings(req, res, next) {
  try {
    const where = req.user.role === "LECTURER" ? { service: { userId: req.user.userId } } : { userId: req.user.userId };
    responseHandler(res, 200, "Bookings retrieved successfully", await prisma.booking.findMany({ where, include: bookingInclude, orderBy: { startTime: "desc" } }));
  } catch (err) { next(err); }
}

export async function getBooking(req, res, next) {
  try {
    const item = await prisma.booking.findUnique({ where: { id: req.params.id }, include: bookingInclude });
    if (!item) return res.status(404).json({ message: "Booking not found" });
    if (item.userId !== req.user.userId && item.service.userId !== req.user.userId) return res.status(403).json({ message: "Unauthorized" });
    responseHandler(res, 200, "Booking retrieved successfully", item);
  } catch (err) { next(err); }
}

async function setStatus(req, res, next, status, message) {
  try {
    const existing = await prisma.booking.findUnique({ where: { id: req.params.id }, include: { service: true } });
    if (!existing) return res.status(404).json({ message: "Booking not found" });
    const isOwner = existing.userId === req.user.userId || existing.service.userId === req.user.userId;
    if (!isOwner) return res.status(403).json({ message: "Unauthorized" });
    const item = await bookingUpdate(existing.id, status);
    const recipientId = req.user.userId === existing.userId ? existing.service.userId : existing.userId;
    await createNotification({ userId: recipientId, bookingId: existing.id, title: message, message: `The booking is now ${status.toLowerCase()}`, type: `BOOKING_${status}` });
    responseHandler(res, 200, message, item);
  } catch (err) { next(err); }
}
export const acceptBooking = (req, res, next) => setStatus(req, res, next, "CONFIRMED", "Booking accepted");
export const cancelBooking = (req, res, next) => setStatus(req, res, next, "CANCELLED", "Booking cancelled");
export const completedBooking = (req, res, next) => setStatus(req, res, next, "COMPLETED", "Booking marked as completed");
export const rejectBooking = (req, res, next) => setStatus(req, res, next, "REJECTED", "Booking rejected");
export const missedBooking = (req, res, next) => setStatus(req, res, next, "MISSED", "Booking marked as missed");

export async function reschedule(req, res, next) {
  const { newStartTime, newEndTime } = req.body;
  if (!newStartTime || !newEndTime) return res.status(400).json({ message: "New start and end times are required" });
  try {
    const existing = await prisma.booking.findUnique({ where: { id: req.params.id }, include: { service: true } });
    if (!existing) return res.status(404).json({ message: "Booking not found" });
    if (existing.userId !== req.user.userId && existing.service.userId !== req.user.userId) return res.status(403).json({ message: "Unauthorized" });
    const item = await prisma.booking.update({ where: { id: existing.id }, data: { startTime: new Date(newStartTime), endTime: new Date(newEndTime), status: "CONFIRMED" } });
    const recipientId = req.user.userId === existing.userId ? existing.service.userId : existing.userId;
    await createNotification({ userId: recipientId, bookingId: existing.id, title: "Booking rescheduled", message: "Your appointment time has changed", type: "BOOKING_RESCHEDULED" });
    responseHandler(res, 200, "Booking rescheduled", item);
  } catch (err) { next(err); }
}
