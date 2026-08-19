import { prisma } from "../config/db.js";

export const createServiceModel = (data) => prisma.service.create({ data: { ...data, availability: data.availability ? { create: data.availability } : undefined }, include: { availability: true, user: true } });
export const getServiceInfoModel = (id) => prisma.service.findUnique({ where: { id }, include: { availability: true, user: true } });
export const closeServiceModel = (id) => prisma.service.delete({ where: { id } });
