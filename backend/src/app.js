import dotenv from "dotenv"; // 1. Import dotenv first
dotenv.config(); // 2. Run config immediately so variables are available to all files below!

import express from "express";
import cors from "cors";
import router from "./route/router.js";
import errorHandler from "./middleware/errorHandler.js";
import { processAppointmentReminders } from "./services/notification.service.js";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/health", (req, res) =>
  res
    .status(200)
    .json({
      status: 200,
      message: "Server is running",
      data: { uptime: process.uptime(), database: "configured" },
    }),
);
app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
  console.log("--- Env Verification ---");
  console.log("Database URL Target:", process.env.DATABASE_URL);
  console.log(
    "Model API Key Loaded:",
    process.env.MONGODB_MODEL_API_KEY ? "Yes ✅" : "No ❌",
  );
});

const reminderTimer = setInterval(() => {
  processAppointmentReminders().catch((error) => console.error("Reminder worker failed:", error.message));
}, 5 * 60 * 1000);
reminderTimer.unref();
processAppointmentReminders().catch((error) => console.error("Initial reminder check failed:", error.message));
