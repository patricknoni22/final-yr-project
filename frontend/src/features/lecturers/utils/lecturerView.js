export function formatLecturer(lecturer, fallbackImage) {
  return {
    id: lecturer.id,
    name: formatLecturerName(lecturer.username, lecturer.title),
    department: lecturer.department || "Department not set",
    title: lecturer.title || lecturer.department || "Lecturer",
    office: lecturer.office || "Office location unavailable",
    image: lecturer.imageUrl ? { uri: lecturer.imageUrl } : fallbackImage,
    about: lecturer.bio || "No biography has been added yet.",
    service: lecturer.service?.find((item) => item.bookableDates?.length) || lecturer.service?.[0],
  };
}

export function formatLecturerName(username, title) {
  const name = String(username || "Lecturer").trim();
  const academicTitle = String(title || "").trim();
  if (!academicTitle) return name;
  if (name.toLowerCase().startsWith(academicTitle.toLowerCase())) return name;
  return `${academicTitle} ${name}`;
}

export function formatBookableDates(service, now = new Date()) {
  const options = { timeZone: "Africa/Lagos" };
  return (service?.bookableDates || []).map((day) => {
    const value = new Date(`${day.id}T12:00:00+01:00`);
    const slots = day.slots.filter((slot) => new Date(slot.startTime) > now).map((slot) => {
      const start = new Date(slot.startTime);
      const end = new Date(slot.endTime);
      const clock = { ...options, hour: "numeric", minute: "2-digit", hour12: true };
      return { id: slot.startTime, value: start, end, label: `${start.toLocaleTimeString("en-NG", clock)} - ${end.toLocaleTimeString("en-NG", clock)}` };
    });
    return { id: day.id, value, slots, day: value.toLocaleDateString("en-NG", { ...options, weekday: "short" }).toUpperCase(), date: String(Number(day.id.slice(-2))), label: value.toLocaleDateString("en-NG", { ...options, weekday: "long", month: "long", day: "numeric" }) };
  }).filter((day) => day.slots.length);
}

export function buildBookableDates(availability = [], count = 7) {
  const enabledDays = new Set(availability.map((item) => item.dayOfWeek));
  const dates = [];
  for (let offset = 0; offset < 30 && dates.length < count; offset += 1) {
    const value = new Date();
    value.setDate(value.getDate() + offset);
    if (!enabledDays.has(value.getDay())) continue;
    dates.push({ id: value.toISOString().slice(0, 10), day: value.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase(), date: String(value.getDate()), label: value.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }), value });
  }
  return dates;
}

export function buildTimeSlots(availability = [], selectedDate, duration = 30, now = new Date()) {
  if (!selectedDate?.value) return [];
  const period = availability.find((item) => item.dayOfWeek === selectedDate.value.getDay());
  if (!period) return [];
  const [startHour, startMinute] = period.startTime.split(":").map(Number);
  const [endHour, endMinute] = period.endTime.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  const slots = [];
  for (let minute = start; minute + duration <= end; minute += duration) {
    const date = new Date(selectedDate.value);
    date.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
    const slotEnd = new Date(date.getTime() + duration * 60000);
    // Past slots are never bookable. Future dates are unaffected because their
    // generated start times are greater than `now`.
    if (date <= now) continue;
    const startLabel = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
    const endLabel = slotEnd.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
    slots.push({ label: `${startLabel} - ${endLabel}`, value: date });
  }
  return slots;
}
