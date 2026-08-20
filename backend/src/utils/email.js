const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendEmail(to, subject, text) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.error("Email not sent: RESEND_API_KEY or EMAIL_FROM is missing");
    return null;
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "smartmeet-api/1.0",
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Resend rejected the email:",
        result.message || response.statusText,
      );
      return null;
    }

    return result;
  } catch (error) {
    console.error("Failed to send email through Resend:", error.message);
    return null;
  }
}

export const sendBookingConfirmationEmail = (email, details) =>
  sendEmail(
    email,
    "Booking Confirmed",
    `Your booking for ${details.serviceName} is confirmed for ${new Date(details.startTime).toLocaleString()}.`,
  );

export const sendBookingCancellationEmail = (email, details) =>
  sendEmail(
    email,
    "Booking Cancelled",
    `Your booking for ${details.serviceName} on ${new Date(details.startTime).toLocaleString()} has been cancelled.`,
  );

export const sendBookingRejectedEmail = (email, details) =>
  sendEmail(
    email,
    "Booking Rejected",
    `Your booking for ${details.serviceName} on ${new Date(details.startTime).toLocaleString()} has been rejected by the lecturer.`,
  );

export const sendBookingRescheduledEmail = (email, details) =>
  sendEmail(
    email,
    "Booking Rescheduled",
    `Your booking for ${details.serviceName} has been rescheduled to ${new Date(details.startTime).toLocaleString()}.`,
  );

export const sendPasswordResetEmail = (email, token) =>
  sendEmail(
    email,
    "Password Reset Request",
    `Use this token to reset your password: ${token}\n\nIf you did not request this, ignore this email.`,
  );

export const sendVerificationEmail = (email, token) =>
  sendEmail(
    email,
    "Verify Your Email",
    `Use this 8-digit code to verify your email address: ${token}`,
  );
