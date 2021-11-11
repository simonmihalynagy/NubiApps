//**convert existing appointment start and duration to objects based on minute values */

export const convertAppointmentTimes = (start, duration) => {
  return { start: start * 60, duration: duration };
};

//** convert minute based elements to HH:MM  string fromat */

export const convertToTimeSlotString = (timeSlot) => {
  const hours = Math.floor(timeSlot / 60);
  const minutes = timeSlot % 60;
  // console.log(hours, minutes);
  if (minutes === 0) {
    return `${hours.toString()}:00`;
  } else {
    return `${hours.toString()}:${minutes.toString()}`;
  }
};

export const getTheHours = (time) => {
  return parseInt(time.slice(0, 2));
};

export const getTheMinutes = (time) => {
  return parseInt(time.slice(3, 5));
};

export const getTheYear = (date) => {
  return parseInt(date.slice(0, 4));
};

export const getTheDay = (date) => {
  return parseInt(date.slice(8, 10));
};
export const getTheMonth = (date) => {
  const month = parseInt(date.slice(5, 7));
  console.log("this is the month from getTheMonth: ", month);
  return month;
};

export const convertToMinuteBasedTime = (time) => {
  return getTheHours(time) * 60 + getTheMinutes(time);
};

export const calculateEndMinutes = (startMinutes, duration) => {
  let endMinutes = 0;
  if (duration === 60) {
    endMinutes = startMinutes;
  } else if (startMinutes + duration === 60) {
    endMinutes = 0;
  } else if (duration < 60) {
    endMinutes = startMinutes + duration;
  } else if (duration > 60) {
    endMinutes = startMinutes + (duration - 60);
  }
  return endMinutes;
};

export const calculateEndHours = (startHours, startMinutes, duration) => {
  let endHours = 0;
  if (duration < 60) {
    if (startMinutes + duration === 60) {
      endHours = startHours + 1;
    } else if (startMinutes + duration > 60) {
      endHours = startHours + 1;
    } else {
      endHours = startHours;
    }
  } else {
    endHours = startHours + 1;
  }
  return endHours;
};

export const formatEventForCalendar = (app) => {
  const duration = parseInt(app.duration);
  const Year = getTheYear(app.date);
  const Month = getTheMonth(app.date);
  const Day = getTheDay(app.date);
  const startHours = getTheHours(app.start);
  const startMinutes = getTheMinutes(app.start);
  const endHours = calculateEndHours(startHours, startMinutes, duration);
  const endMinutes = calculateEndMinutes(startMinutes, duration);

  console.log("endMinutes: ", endMinutes);
  console.log("Month before calling new Date", Month);

  const appointment = {
    id: app.id,
    title: app.service,
    start: new Date(Year, Month - 1, Day, startHours, startMinutes, 0),
    end: new Date(Year, Month - 1, Day, endHours, endMinutes, 0),
    desc: `client: ${app.client.firstName} ${app.client.lastName}, service: ${app.service}`,
  };
  // console.log("this appointment has just been formatted in format event for calendar", appointment);

  return appointment;
};

export const createPossibleTimeSlotsInMinutes = (businessOpeningHour, serviceDuration, businessClosingHour) => {
  let timeSlotArray = [];
  for (let i = businessOpeningHour; i < businessClosingHour; i += serviceDuration) {
    console.log(i);
    timeSlotArray.push(i);
  }
  console.log(timeSlotArray);
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

export const createFreeTimeBlocksBetweenAppointments = (appointments, businessHours) => {
  console.log("these are the apppointments: ", appointments);
  console.log("these are the businessHours: ", businessHours);
  let freeTimeBlocks = [];

  for (let i = 0; i < appointments.length; i++) {
    if (i === 0) {
      if (appointments[i].start !== businessHours.start) {
        const firstAppointment = appointments[i];
        freeTimeBlocks.push({
          start: businessHours.start,
          duration: firstAppointment.start - businessHours.start,
          finish: firstAppointment.start,
        });
      }
    } else if (i === appointments.length - 1) {
      if (appointments[i].finish !== businessHours.finish) {
        const lastAppointment = appointments[i];
        freeTimeBlocks.push({
          start: lastAppointment.finish,
          duration: businessHours.finish - lastAppointment.finish,
          finish: businessHours.finish,
        });
      }
    } else {
      const currentAppointment = appointments[i];
      const nextAppointment = appointments[i + 1];
      if (currentAppointment.finish < nextAppointment.start)
        freeTimeBlocks.push({
          start: currentAppointment.finish,
          duration: nextAppointment.start - currentAppointment.finish,
        });
    }
  }
  return freeTimeBlocks.sort((block1, block2) => {
    return block1.start - block2.start;
  });
};

export const createAllTimeSlotsInFreeTimeBlock = (interval, serviceDuration) => {
  const numberOfSlots = interval.duration / serviceDuration;

  const timeSlotArray = [];
  for (let i = 1; i <= numberOfSlots; i++) {
    if (i === 1) {
      timeSlotArray.push(interval.start);
    } else {
      const timeSlotStart = i * serviceDuration;
      timeSlotArray.push(interval.start + timeSlotStart);
    }
  }
  return timeSlotArray;
};

export const createTimeSlots = (appointmentsArr, chosenServiceDuration, businessHours) => {
  const serviceDuration = parseInt(chosenServiceDuration);
  const businessOpening = convertToMinuteBasedTime(businessHours.start);
  const businessClosing = convertToMinuteBasedTime(businessHours.finish);
  const businessHoursInMinutes = { start: businessOpening, finish: businessClosing };

  let timeSlotsArray = [];

  if (appointmentsArr.length === 0) {
    const allPossibleTimeSlots = createPossibleTimeSlotsInMinutes(businessOpening, serviceDuration, businessClosing);
    console.log(allPossibleTimeSlots);
    timeSlotsArray = allPossibleTimeSlots.map((timeSlot) => {
      return convertToTimeSlotString(timeSlot);
    });
  } else {
    const existingAppointments = formatAppointments(appointmentsArr);
    const freeTimeBlocks = createFreeTimeBlocksBetweenAppointments(existingAppointments, businessHoursInMinutes);
    // console.log(freeTimeBlocks);
    timeSlotsArray = freeTimeBlocks.map((freeTimeBlock) => {
      if (freeTimeBlock.duration > serviceDuration) {
        return createAllTimeSlotsInFreeTimeBlock(freeTimeBlock, serviceDuration);
      } else {
        return;
      }
    })[0];
    console.log(timeSlotsArray);
    timeSlotsArray = timeSlotsArray.map((timeSlot) => {
      return convertToTimeSlotString(timeSlot);
    });
  }

  return timeSlotsArray;
};
