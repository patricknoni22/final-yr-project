import { prisma } from "../config/db.js";

export const UserRegisterService = (data) => prisma.user.create({
  data,
  select: { id: true, username: true, email: true, role: true, department: true, title: true, office: true, studentId: true, createdAt: true }
});

export const UserLoginService = (email) => prisma.user.findUnique({ where: { email } });

export const updatePasswordService = (id, password) => prisma.user.update({ where: { id }, data: { password } });

export async function logoutService(userId) {
  await prisma.token.deleteMany({ where: { userId } });
  return prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, email: true, role: true } });
}
