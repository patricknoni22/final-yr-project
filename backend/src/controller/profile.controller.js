import { prisma } from "../config/db.js";
import { responseHandler } from "../middleware/responseHandler.js";
import { blockingStatuses, withBookableSlots } from "../utils/bookableSlots.js";

const serviceAvailability = () => ({ include: { availability: true, booking: { where: { status: { in: blockingStatuses }, endTime: { gt: new Date() } }, select: { startTime: true, endTime: true, status: true } } } });

const publicFields = { id: true, username: true, email: true, role: true, title: true, department: true, faculty: true, level: true, office: true, bio: true, studentId: true, imageUrl: true, academicFocus: true, averageRating: true, reviewsCount: true, isActive: true, isEmailVerified: true };

export async function getMe(req, res, next) {
  try { responseHandler(res, 200, "Profile retrieved", await prisma.user.findUnique({ where: { id: req.user.userId }, select: publicFields })); } catch (err) { next(err); }
}

export async function updateMe(req, res, next) {
  const allowed = ["username", "title", "department", "faculty", "level", "office", "bio", "studentId", "imageUrl", "academicFocus", "isActive"];
  const data = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  try { responseHandler(res, 200, "Profile updated", await prisma.user.update({ where: { id: req.user.userId }, data, select: publicFields })); } catch (err) { next(err); }
}

export async function getLecturers(req, res, next) {
  const { search, department } = req.query;
  const where = { role: "LECTURER", isActive: true };
  if (department) where.department = department;
  if (search) where.OR = [{ username: { contains: search, mode: "insensitive" } }, { department: { contains: search, mode: "insensitive" } }];
  try {
    const users = await prisma.user.findMany({ where, select: { ...publicFields, service: serviceAvailability() } });
    responseHandler(res, 200, "Lecturers retrieved", users.map((user) => withBookableSlots(user)));
  } catch (err) { next(err); }
}

export async function getLecturer(req, res, next) {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.params.id, role: "LECTURER" }, select: { ...publicFields, service: serviceAvailability() } });
    if (!user) return res.status(404).json({ message: "Lecturer not found" });
    responseHandler(res, 200, "Lecturer retrieved", withBookableSlots(user));
  } catch (err) { next(err); }
}

export async function getStudents(req, res, next) {
  try { responseHandler(res, 200, "Students retrieved", await prisma.user.findMany({ where: { role: "STUDENT", isActive: true }, select: publicFields })); } catch (err) { next(err); }
}

export async function getStudent(req, res, next) {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.params.id, role: "STUDENT" }, select: publicFields });
    if (!user) return res.status(404).json({ message: "Student not found" });
    responseHandler(res, 200, "Student retrieved", user);
  } catch (err) { next(err); }
}

export async function getDepartments(req, res, next) {
  try {
    const users = await prisma.user.findMany({ where: { department: { not: null } }, select: { department: true } });
    const departments = [...new Set(users.map(({ department }) => department).filter(Boolean))].sort().map((name) => ({ id: name.toLowerCase().replace(/\s+/g, "-"), name }));
    responseHandler(res, 200, "Departments retrieved", departments);
  } catch (err) { next(err); }
}

