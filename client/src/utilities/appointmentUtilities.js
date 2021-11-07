//**to check if currently inspected appointment possibility falls into the range of start and finsh time of next appointment */

function range(start, end) {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

//**convert existing appointment start and duration to objects based on minute values */

const convertAppointmentTimes = (start, duration) => {
  return { start: start * 60, duration: duration };
};

//** convert minute based elements to HH:MM fromat */

const convertToRealTimeSlots = (timeSlot) => {
  const hours = Math.floor(timeSlot / 60);
  const minutes = timeSlot % 60;
  return `${hours.toString()}:${minutes.toString()}`;
};

const getHours = (time) => {
  return parseInt(time.slice(0, 2));
};

const getMinutes = (time) => {
  return parseInt(time.slice(3, 5));
};

const convertToMinuteBasedTime = (time) => {
  return getHours(time) * 60 + getMinutes(time);
};
