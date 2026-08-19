import jwt from "jsonwebtoken";
import { responseHandler } from "../middleware/responseHandler.js";
import { generateAccessToken } from "../middleware/token.js";
import { verifyRefreshToken } from "../model/auth.model.js";

export async function newAccessToken(req, res, next) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "Refresh token is required" });
  try {
    const stored = await verifyRefreshToken(refreshToken);
    if (!stored) return res.status(401).json({ message: "Invalid refresh token" });
    const user = jwt.verify(stored.token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = await generateAccessToken({ userId: user.userId, email: user.email, role: user.role });
    responseHandler(res, 200, "Access token generated successfully", { accessToken });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") return res.status(401).json({ message: "Invalid refresh token" });
    next(err);
  }
}
