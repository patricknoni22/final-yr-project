import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../config/db.js";
import { authSchema, registerSchema } from "../middleware/joi.js";
import { responseHandler } from "../middleware/responseHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/token.js";
import { storeToken } from "../model/token.model.js";
import {
  UserLoginService,
  UserRegisterService,
  logoutService,
  updatePasswordService,
} from "../model/user.model.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../utils/email.js";

const generateVerificationCode = () =>
  crypto.randomInt(100_000, 1_000_000).toString();

export async function UserRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { username, password, department, title, office, studentId } = req.body;
  const email = req.body.email.toLowerCase();
  const role = req.body.role.toUpperCase();
  try {
    if (await UserLoginService(email))
      return res.status(409).json({ message: "Email already exists" });
    const verificationToken = generateVerificationCode();
    const user = await UserRegisterService({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      department,
      title,
      office,
      studentId,
      verificationToken,
    });
    if (role === "LECTURER") {
      await prisma.service.create({
        data: {
          name: "Academic Consultation",
          description: `Book an academic consultation with ${username}`,
          duration: 30,
          userId: user.id,
        },
      });
    }
    const verificationEmailSent = Boolean(
      await sendVerificationEmail(email, verificationToken),
    );
    responseHandler(
      res,
      201,
      verificationEmailSent
        ? `${username} has registered`
        : `${username} has registered, but the verification email could not be sent`,
      { ...user, verificationEmailSent },
    );
  } catch (err) {
    next(err);
  }
}

export async function UserLogin(req, res, next) {
  const { error } = authSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  try {
    const user = await UserLoginService(req.body.email.toLowerCase());
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });
    if (user.role !== req.body.role.toUpperCase())
      return res.status(403).json({
        code: "ROLE_MISMATCH",
        message: `This account is registered as a ${user.role.toLowerCase()}. Select ${user.role.toLowerCase()} to continue.`,
      });
    if (!user.isActive)
      return res.status(403).json({ message: "Account is inactive" });
    if (!user.isEmailVerified)
      return res
        .status(403)
        .json({
          code: "EMAIL_NOT_VERIFIED",
          message: "Verify your email before logging in",
        });
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    await storeToken(user.id, refreshToken);
    responseHandler(res, 200, `${user.username} has logged in`, {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        title: user.title,
        office: user.office,
        studentId: user.studentId,
        imageUrl: user.imageUrl,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return res
      .status(400)
      .json({ message: "Old and new passwords are required" });
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!(await bcrypt.compare(oldPassword, user.password)))
      return res.status(401).json({ message: "Invalid password" });
    await updatePasswordService(user.id, await bcrypt.hash(newPassword, 10));
    responseHandler(res, 200, "Password changed successfully");
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    responseHandler(
      res,
      200,
      "Logged out successfully",
      await logoutService(req.user.userId),
    );
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required" });
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email.toLowerCase() },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const resetToken = crypto.randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry: new Date(Date.now() + 3600000) },
    });
    await sendPasswordResetEmail(user.email, resetToken);
    responseHandler(res, 200, "Password reset email sent");
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(newPassword, 10),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    responseHandler(res, 200, "Password has been reset successfully");
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req, res, next) {
  if (!req.body.token)
    return res.status(400).json({ message: "Verification token is required" });
  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: req.body.token },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid verification token" });
    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true, verificationToken: null },
    });
    responseHandler(res, 200, "Email verified successfully");
  } catch (err) {
    next(err);
  }
}

export async function resendVerificationEmail(req, res, next) {
  if (!req.body.email)
    return res.status(400).json({ message: "Email is required" });
  try {
    const email = req.body.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isEmailVerified)
      return responseHandler(res, 200, "Email is already verified");

    const verificationToken = generateVerificationCode();
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });
    const sent = await sendVerificationEmail(email, verificationToken);
    if (!sent)
      return res
        .status(503)
        .json({
          message:
            "Verification email could not be sent. Please try again later.",
        });
    responseHandler(res, 200, "Verification email sent");
  } catch (err) {
    next(err);
  }
}
