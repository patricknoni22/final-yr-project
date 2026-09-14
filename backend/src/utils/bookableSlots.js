// Saved consultation hours are campus wall-clock times in Lagos (UTC+1).
const OFFSET = 60 * 60000;
export const blockingStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "MISSED"];

export function campusDateKey(date) {
  return new Date(new Date(date).getTime() + OFFSET).toISOString().slice(0, 10);
}

export function buildBookableDates(service, now = new Date()) {
  const duration = Number(service.duration);
  if (!Number.isInteger(duration) || duration <= 0) return [];
  const dates = [];
  const today = campusDateKey(now);
  for (let offset = 0; offset < 30 && dates.length < 7; offset++) {
    const day = new Date(`${today}T00:00:00Z`);
    day.setUTCDate(day.getUTCDate() + offset);
    const id = day.toISOString().slice(0, 10);
    const slots = new Map();
    for (const period of service.availability || []) {
      if (period.dayOfWeek !== day.getUTCDay()) continue;
      const start = new Date(`${id}T${period.startTime}:00+01:00`).getTime();
      const end = new Date(`${id}T${period.endTime}:00+01:00`).getTime();
      for (let time = start; time + duration * 60000 <= end; time += duration * 60000) {
        const finish = time + duration * 60000;
        if (time <= now.getTime()) continue;
        if ((service.booking || []).some((booking) => blockingStatuses.includes(booking.status) && new Date(booking.startTime).getTime() < finish && new Date(booking.endTime).getTime() > time)) continue;
        slots.set(time, { startTime: new Date(time).toISOString(), endTime: new Date(finish).toISOString() });
      }
    }
    if (slots.size) dates.push({ id, slots: [...slots.values()].sort((a, b) => a.startTime.localeCompare(b.startTime)) });
  }
  return dates;
}

export function isWithinAvailability(service, start, end) {
  const key = campusDateKey(start);
  if (key !== campusDateKey(end)) return false;
  const weekday = new Date(`${key}T00:00:00Z`).getUTCDay();
  return service.availability.some((period) => period.dayOfWeek === weekday && start >= new Date(`${key}T${period.startTime}:00+01:00`) && end <= new Date(`${key}T${period.endTime}:00+01:00`));
}

export function withBookableSlots(user, now = new Date()) {
  if (!user) return user;
  const service = user.service.map(({ booking, ...item }) => ({ ...item, bookableDates: buildBookableDates({ ...item, booking }, now) }));
  return { ...user, service, availableToday: service.some((item) => item.bookableDates.some((day) => day.id === campusDateKey(now))) };
}
