//**to check if currently inspected appointment possibility falls into the range of start and finsh time of next appointment */

export const range = (start, end) => {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
};

//**convert existing appointment start and duration to objects based on minute values */

export const convertAppointmentTimes = (start, duration) => {
  return { start: start * 60, duration: duration };
};

//** convert minute based elements to HH:MM  string fromat */

export const convertToTimeSlotString = (timeSlot) => {
  const hours = Math.floor(timeSlot / 60);
  const minutes = timeSlot % 60;
  if (minutes === 0) {
    return `${hours.toString()}:00`;
  } else {
    return `${hours.toString()}:${minutes.toString()}`;
  }
};

export const getHours = (time) => {
  return parseInt(time.slice(0, 2));
};

export const getMinutes = (time) => {
  return parseInt(time.slice(3, 5));
};

export const convertToMinuteBasedTime = (time) => {
  return getHours(time) * 60 + getMinutes(time);
};

export const createPossibleTimeSlotsInMinutes = (businessOpeningHour, serviceDuration, businessClosingHour) => {
  let timeSlotArray = [];
  for (let i = businessOpeningHour; i < businessClosingHour; i += serviceDuration) {
    timeSlotArray.push(i);
  }
  return timeSlotArray;
};

export const formatAppointments = (appointmentsArr) => {
  return appointmentsArr
    .map((appointment) => {
      return {
        start: convertToMinuteBasedTime(appointment.start),
        duration: parseInt(appointment.duration),
        finish: convertToMinuteBasedTime(appointment.start) + parseInt(appointment.duration),
      };
    })
    .sort((app1, app2) => app1.start - app2.start);
};

export const createTimeSlots = (appointmentsArr, chosenServiceDuration, businessHours) => {
  console.log("createTimeSlotsFired");
  const serviceDuration = parseInt(chosenServiceDuration);
  const businessOpening = convertToMinuteBasedTime(businessHours.start);
  const businessClosing = convertToMinuteBasedTime(businessHours.finish);

  // const possibleTimeSlotsInMinutes = createPossibleTimeSlotsInMinutes(
  //   businessOpeningInt,
  //   serviceDurationInt,
  //   businessClosingInt
  // );

  const existingAppointments = formatAppointments(appointmentsArr);

  let timeSlotsArray = [];

  for (let i = businessOpening; i < businessClosing; i += serviceDuration) {
    if (existingAppointments.length === 0) {
      timeSlotsArray.push(convertToTimeSlotString(i));
      console.log("timeSlotsArray first iteration if there wasnt any appointments", timeSlotsArray);
    } else {
      for (let j = 0; j < existingAppointments.length; j++) {
        if (i >= existingAppointments[j].start) {
          if (i <= existingAppointments[j].finish) {
            i += serviceDuration;
          }
          // console.log(`this iteration is from j-loop after checking condition 1 and i's value is ${i}`);
          // console.log("value of i from first condition in j loop after condition 1: ", i);
        } else if (i + serviceDuration > existingAppointments[j].start) {
          if (i + serviceDuration < existingAppointments[j].finish) {
            i += serviceDuration;
          }
        } else {
          // console.log(`this iteration is from j-loop and entered else statement and i's value is ${i}`);
          // timeSlotsArray.push(convertToTimeSlotString(i));
          continue;
        }
      }
      timeSlotsArray.push(convertToTimeSlotString(i));
    }
  }
  return timeSlotsArray;
};
