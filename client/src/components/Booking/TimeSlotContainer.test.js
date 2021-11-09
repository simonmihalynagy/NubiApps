import { createTimeSlots } from "/utils.js";

test("creates timeslots", () => {
  const results = createTimeSlots();

  expect(results).toEqual([]);
});
