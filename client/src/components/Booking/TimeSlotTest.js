const createTimeSlots = (appointmentsArr, chosenServiceDuration, businessHours) => {
  //**format existing appointments to sorted array of objects [{start,duration,finish}] */

  const serviceDurationInt = parseInt(chosenServiceDuration);
  const businessOpeningInt = convertToMinuteBasedTime(businessHours.start);
  const businessClosingInt = convertToMinuteBasedTime(businessHours.finish);

  const existingAppsData = appointmentsArr
    .map((appointment) => {
      return {
        start: convertToMinuteBasedTime(appointment.start),
        duration: parseInt(appointment.duration),
        finish: convertToMinuteBasedTime(appointment.start) + parseInt(appointment.duration),
      };
    })
    .sort(app1, (app2) => app1.start - app2.start);

  const timeSlotsArray = [];

  for (let i = businessOpeningInt; i < businessClosingInt; i += serviceDurationInt) {
    if (existingAppsData.length === 0) {
      timeSlotsArray.push(convertToTimeSlotString(i));
    } else {
      for (let j = 0; j < existingAppsData.length; j++) {
        if (range(existingAppsData[j].start, existingAppsData[j].finish - 1).includes(i)) {
          i += existingAppsData[j].duration;
          continue;
        } else {
          timeSlotsArray.push(convertToTimeSlotString(i));
        }
      }
    }
  }
  setTimeSlots(timeSlotsArray);
};

//**trying new timeslot creator below */

const createTimeSlots = (appointmentsArr, chosenServiceDuration, businessHours) => {
  const serviceDurationInt = parseInt(chosenServiceDuration);
  const businessOpeningInt = convertToMinuteBasedTime(businessHours.start);
  const businessClosingInt = convertToMinuteBasedTime(businessHours.finish);

  const possibleTimeSlotsInMinutes = createPossibleTimeSlotsInMinutes(
    businessOpeningInt,
    serviceDurationInt,
    businessClosingInt
  );

  const formattedExistingAppointments = formatExistingAppointmentsData(appointmentsArr);

  for (let i = businessOpeningInt; i < businessClosingInt; i += serviceDurationInt) {
    console.log("value of i from loop start: ", i);

    if (existingAppsData.length === 0) {
      timeSlotsArray.push(convertToTimeSlotString(i));
      console.log("timeSlotsArray first iteration if there wasnt any appointments", timeSlotsArray);
    } else {
      for (let j = 0; j < existingAppsData.length; j++) {
        if (range(existingAppsData[j].start, existingAppsData[j].finish - 1).includes(i)) {
          console.log(`this iteration is from j-loop after checking condition 1 and i's value is ${i}`);
          console.log("value of i from first condition in j loop after condition 1: ", i);
          continue;
        } else {
          console.log(`this iteration is from j-loop and entered else statement and i's value is ${i}`);
          timeSlotsArray.push(convertToTimeSlotString(i));
        }
      }
      i += existingAppsData[j].duration;
    }
  }
  setTimeSlots(timeSlotsArray);
};
