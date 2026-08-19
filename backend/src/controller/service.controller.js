import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";
import { closeServiceModel, createServiceModel, getServiceInfoModel } from "../model/service.model.js";

export async function createService(req, res, next) {
  const { name, description, duration, availability = [] } = req.body;
  if (!name || !duration) return res.status(400).json({ message: "Name and duration are required" });
  try {
    const service = await createServiceModel({ name, description, duration: Number(duration), userId: req.user.userId, availability });
    responseHandler(res, 201, "Service created successfully", service);
  } catch (err) { next(err); }
}

export async function getServiceInfo(req, res, next) {
  try {
    const service = await getServiceInfoModel(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    responseHandler(res, 200, "Service retrieved successfully", service);
  } catch (err) { next(err); }
}

export async function getServices(req, res, next) {
  try {
    const services = await prisma.service.findMany({ include: { availability: true, user: { select: { id: true, username: true, title: true, department: true, office: true, imageUrl: true } } } });
    responseHandler(res, 200, "Services retrieved successfully", services);
  } catch (err) { next(err); }
}

export async function closeService(req, res, next) {
  try {
    const service = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId !== req.user.userId) return res.status(403).json({ message: "Unauthorized" });
    responseHandler(res, 200, "Service deleted successfully", await closeServiceModel(req.params.id));
  } catch (err) { next(err); }
}
