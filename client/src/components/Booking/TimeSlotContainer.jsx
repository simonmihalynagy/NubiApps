import React, { useState, useEffect } from "react";
import axios from "axios";
//**props: start (refers to business opening hour), finish (business closing hour), duration ( duration of service), exception(already booked timeslots, lunch breaks),  */

export default function TimeSlotContainer(props) {
  //console.log(props);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clickedTimeSlot, setClickedTimeSlot] = useState("");
  // const [appointments, setAppointments] = useState([]);

  const createTimeSlots = (appointments) => {
    //const duration = parseInt("60") / 60;
    const start = "10:00";
    const finish = "17:00";
    const startInt = parseInt(start.slice(0, 2));
    const finishInt = parseInt(finish.slice(0, 2));
    const timeSlotsArray = [];

    const appointmentsOnTheSameDate = appointments.filter((appointment) => {
      return appointment.date.slice(0, 10) === props.chosenDate;
    });

    const existingStartTimes = appointmentsOnTheSameDate.map((appointment) => {
      return parseInt(appointment.start.slice(0, 3));
    });

    console.log(existingStartTimes);
    //console.log("appointments array first element:", appointments[0]);
    // console.log("the existing startTimes are: ", existingStartTimes);

    for (let i = startInt; i <= finishInt; i++) {
      if (existingStartTimes.includes(i)) {
        continue;
      } else {
        timeSlotsArray.push(i.toString() + ":00");
        console.log(timeSlotsArray);
      }
    }
    setTimeSlots(timeSlotsArray);
  };

  const getAppointments = () => {
    axios.get(`/booking/get-all-appointments/${props.chosenEmployee}`).then((response) => {
      console.log(response.data.foundAppointments);

      createTimeSlots(response.data.foundAppointments);

      // createTimeSlots();
    });
  };

  useEffect(() => {
    getAppointments();
  }, [props.chosenEmployee]);

  const timeSlotClickHandler = (event) => {
    setClickedTimeSlot(event.target.value);
    props.inputChangeHandler(event);
  };

  return (
    <div className="pt-4 flex justify-around">
      {/* {console.log("these are the appointments: ", appointments)} */}
      {timeSlots.map((timeSlot) => {
        return (
          <button
            type="button"
            onClick={timeSlotClickHandler}
            name="start"
            value={timeSlot}
            className={timeSlot === clickedTimeSlot ? "bg-purple-600 text-white" : undefined}
            key={timeSlot}
          >
            {timeSlot}
          </button>
        );
      })}
    </div>
  );
}
