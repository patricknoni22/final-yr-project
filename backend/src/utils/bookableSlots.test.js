import test from "node:test";
import assert from "node:assert/strict";
import { buildBookableDates, isWithinAvailability, withBookableSlots } from "./bookableSlots.js";

const now = new Date("2026-09-14T05:00:00Z");
const service = { duration: 30, availability: [{ dayOfWeek: 1, startTime: "10:00", endTime: "15:00" }], booking: [] };
test("only offers full appointments within saved Lagos hours", () => {
  const [day] = buildBookableDates(service, now);
  assert.equal(day.slots.length, 10);
  assert.equal(day.slots[0].startTime, "2026-09-14T09:00:00.000Z");
  assert.equal(day.slots.at(-1).endTime, "2026-09-14T14:00:00.000Z");
  for (const slot of day.slots) assert.ok(isWithinAvailability(service, new Date(slot.startTime), new Date(slot.endTime)));
  assert.equal(isWithinAvailability(service, new Date("2026-09-14T06:00Z"), new Date("2026-09-14T06:30Z")), false);
});
test("past hours and fully booked days are not available today", () => {
  assert.equal(withBookableSlots({ service: [service] }, new Date("2026-09-14T14:00Z")).availableToday, false);
  const full = { ...service, booking: [{ startTime: "2026-09-14T09:00Z", endTime: "2026-09-14T14:00Z", status: "CONFIRMED" }] };
  assert.equal(withBookableSlots({ service: [full] }, now).availableToday, false);
});
test("overlaps block slots but cancelled and rejected bookings release them", () => {
  for (const status of ["PENDING", "CONFIRMED", "CANCELLED", "REJECTED"]) {
    const busy = { ...service, booking: [{ startTime: "2026-09-14T09:15Z", endTime: "2026-09-14T09:45Z", status }] };
    assert.equal(buildBookableDates(busy, now)[0].slots.length, ["PENDING", "CONFIRMED"].includes(status) ? 8 : 10);
  }
});
test("supports separate periods without offering the gap", () => {
  const split = { ...service, availability: [{ dayOfWeek: 1, startTime: "07:00", endTime: "09:00" }, ...service.availability] };
  const slots = buildBookableDates(split, now)[0].slots;
  assert.equal(slots.length, 14);
  assert.equal(slots.some((slot) => slot.startTime === "2026-09-14T08:00:00.000Z"), false);
});
test("uses the campus date near midnight and omits partial or invalid durations", () => {
  assert.equal(withBookableSlots({ service: [service] }, new Date("2026-09-13T23:30Z")).availableToday, true);
  assert.equal(buildBookableDates({ ...service, duration: 0 }, now).length, 0);
  assert.equal(buildBookableDates({ ...service, duration: 45 }, now)[0].slots.length, 6);
});
