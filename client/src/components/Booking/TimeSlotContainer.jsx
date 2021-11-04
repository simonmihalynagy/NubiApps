import React, { useState, useEffect } from "react";

//**props: start (refers to business opening hour), finish (business closing hour), duration ( duration of service), exception(already booked timeslots, lunch breaks),  */

export default function TimeSlotContainer(props) {
  console.log(props);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clickedTimeSlot, setClickedTimeSlot] = useState("");

  const createTimeSlots = () => {
    const start = "10:00";
    const finish = "17:00";
    const duration = parseInt("60") / 60;
    const startInt = parseInt(start.slice(0, 2));
    const finishInt = parseInt(finish.slice(0, 2));
    const timeSlotsArray = [];

    for (let i = startInt; i <= finishInt; i++) {
      timeSlotsArray.push(i.toString() + ":00");
      console.log(timeSlotsArray);
    }
    setTimeSlots(timeSlotsArray);
  };

  useEffect(() => {
    createTimeSlots();
  }, []);

  const timeSlotClickHandler = (event) => {
    setClickedTimeSlot(event.target.value);
    props.inputChangeHandler(event);
  };

  return (
    <div className="pt-4 flex justify-around">
      {timeSlots.map((timeSlot) => {
        return (
          <button
            type="button"
            onClick={timeSlotClickHandler}
            name="start"
            value={timeSlot}
            className={timeSlot === clickedTimeSlot && "bg-purple-600 text-white"}
            key={timeSlot}
          >
            {timeSlot}
          </button>
        );
      })}
    </div>
  );
}
