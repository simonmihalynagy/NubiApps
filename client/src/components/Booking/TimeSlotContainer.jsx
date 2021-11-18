import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTimeSlots } from "./utils";
//**props: start (refers to business opening hour), finish (business closing hour), duration ( duration of service), exception(already booked timeslots, lunch breaks),  */

export default function TimeSlotContainer(props) {
  // console.log(props);
  const [timeSlots, setTimeSlots] = useState([]);

  const getAppointments = () => {
    const serviceAPI = `/business/get-single-service/${props.chosenService}`;
    const appointmentsAPI = `/booking/get-all-appointments/${props.chosenEmployee}/${props.chosenDate}`;

    const getService = axios.get(serviceAPI);
    const getAppointments = axios.get(appointmentsAPI);
    axios.all([getService, getAppointments]).then(
      axios.spread((...allData) => {
        const chosenServiceDuration = allData[0].data.foundService.duration;
        const appointments = allData[1].data.foundAppointments;

        // console.log("appointments: ", appointments, "chosenService Duration: ", chosenServiceDuration);

        // console.log("this is all data from getAppointments in booking page: ", allData[1].data.foundAppointments);

        const newTimeSlots = createTimeSlots(appointments, chosenServiceDuration, props.businessHours);
        // console.log("new timeslots from timeSlot container: ", newTimeSlots);
        setTimeSlots(newTimeSlots);
      })
    );
  };

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, [props.chosenService, props.chosenEmployee, props.chosenDate]);

  return (
    <div className="pt-4 grid grid-cols-5 justify-around">
      {/* {console.log(timeSlots)} */}

      {timeSlots.map((timeSlot) => {
        return (
          <button
            type="button"
            onClick={props.timeSlotClickHandler}
            name="start"
            value={timeSlot}
            className={
              timeSlot === props.klickedTimeSlot
                ? "mb-4 rounded border border-purple-600 bg-purple-600 text-white"
                : "mb-4 rounded border border-purple-600 hover:bg-purple-600 hover:text-white"
            }
            key={timeSlot}
          >
            {timeSlot}
          </button>
        );
      })}
    </div>
  );
}
