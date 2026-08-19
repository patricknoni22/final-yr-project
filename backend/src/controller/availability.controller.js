import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";

async function lecturerService(userId) { return prisma.service.findFirst({ where: { userId } }); }

export async function getAvailability(req, res, next) {
  try {
    const service = req.params.lecturerId ? await lecturerService(req.params.lecturerId) : await lecturerService(req.user.userId);
    if (!service) return res.status(404).json({ message: "Consultation service not found" });
    responseHandler(res, 200, "Availability retrieved", { serviceId: service.id, duration: service.duration, availability: await prisma.availability.findMany({ where: { serviceId: service.id }, orderBy: { dayOfWeek: "asc" } }) });
  } catch (err) { next(err); }
}

export async function replaceAvailability(req, res, next) {
  const { duration, availability } = req.body;
  if (!Array.isArray(availability)) return res.status(400).json({ message: "Availability must be an array" });
  try {
    const service = await lecturerService(req.user.userId);
    if (!service) return res.status(404).json({ message: "Consultation service not found" });
    await prisma.availability.deleteMany({ where: { serviceId: service.id } });
    await prisma.service.update({ where: { id: service.id }, data: { duration: duration ? Number(duration) : service.duration, availability: { create: availability } } });
    responseHandler(res, 200, "Availability updated", await prisma.service.findUnique({ where: { id: service.id }, include: { availability: true } }));
  } catch (err) { next(err); }
}
