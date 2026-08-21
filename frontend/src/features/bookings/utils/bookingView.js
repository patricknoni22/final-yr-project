const statusLabels = {
  CONFIRMED: "Approved",
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
  MISSED: "Missed",
};

function lecturerName(user) {
  const name = String(user?.username || "Lecturer").trim();
  const title = String(user?.title || "").trim();
  return title && !name.toLowerCase().startsWith(title.toLowerCase()) ? `${title} ${name}` : name;
}

export function formatBooking(booking, role = "student", fallbackImage) {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  const person = role === "lecturer" ? booking.user : booking.service?.user;
  const status = statusLabels[booking.status] || booking.status;
  const isPast = start < new Date();
  return {
    id: booking.id,
    name: role === "lecturer" ? person?.username || "Student" : lecturerName(person),
    department: person?.department || booking.service?.name || "Academic consultation",
    topic: booking.reason || booking.service?.name || "Academic consultation",
    date: Number.isNaN(start.getTime()) ? "Not available" : start.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
    time: Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) ? "Not available" : `${formatTime(start)} - ${formatTime(end)}`,
    dateTime: Number.isNaN(start.getTime()) ? "Not available" : start.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
    location: booking.service?.user?.office || "Office location unavailable",
    status,
    group: role === "lecturer" ? (booking.status === "PENDING" ? "Requests" : booking.status === "CONFIRMED" && !isPast ? "Upcoming" : "Past") : (booking.status === "COMPLETED" || isPast ? "Completed" : "Upcoming"),
    image: person?.imageUrl ? { uri: person.imageUrl } : fallbackImage,
    raw: booking,
  };
}

function formatTime(value) {
  return value.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
}
