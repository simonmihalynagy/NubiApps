import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTimeSlots } from "./utils";
//**props: start (refers to business opening hour), finish (business closing hour), duration ( duration of service), exception(already booked timeslots, lunch breaks),  */

export default function TimeSlotContainer(props) {
  console.log(props);
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

        // console.log("this is all data from getAppointments in booking page: ", allData[1].data.foundAppointments);

        const newTimeSlots = createTimeSlots(appointments, chosenServiceDuration, props.businessHours);
        // console.log("new timeslots from timeSlot container: ", newTimeSlots);
        setTimeSlots(newTimeSlots);
      })
    );
  };

  useEffect(() => {
    getAppointments();
  }, [props.chosenEmployee, props.chosenService, props.chosenData]);

  return (
    <div className="pt-4 flex justify-around">
      {console.log(timeSlots)}
      {/* {console.log("these are the appointments: ", appointments)} */}
      {timeSlots.map((timeSlot) => {
        return (
          <button
            type="button"
            onClick={props.timeSlotClickHandler}
            name="start"
            value={timeSlot}
            className={timeSlot === props.klickedTimeSlot ? "bg-purple-600 text-white" : undefined}
            key={timeSlot}
          >
            {timeSlot}
          </button>
        );
      })}
    </div>
  );
}
