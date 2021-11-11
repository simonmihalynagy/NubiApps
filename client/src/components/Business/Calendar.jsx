import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import {
  getTheYear,
  getTheMinutes,
  getTheHours,
  getTheDay,
  getTheMonth,
  formatEventForCalendar,
} from "../Booking/utils";

// import "react-big-calendar/lib/sass/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles"; // if using DnD

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import eu from "date-fns/locale/eu";

import events from "./eventExamples";
// console.log(events);

const locales = {
  eu: eu,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//selected
//onSelectEvent

export default function MyCalendar(props) {
  // console.log(props.user);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [appointmentsRaw, setAppointmentsRaw] = useState([]);
  const getAppointments = () => {
    const appointmentsAPI = `/calendar/appointments/${props.user._id}`;

    axios.get(appointmentsAPI).then((response) => {
      const appointments = response.data.appointments.map((app) => {
        return formatEventForCalendar(app);
      });

      console.log(appointments);
      setAppointmentsRaw(appointments);
    });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const eventSelectHandler = (event) => {
    setSelectedEvent(event.id);
  };

  const selectSlotHandler = (event) => {
    console.log(event.start);
    setCurrentDate(event.start);
  };

  return (
    <div>
      <h1>Schedule setup comes here</h1>
      <Calendar
        // toolbar={false}
        selectable={true}
        onSelectSlot={selectSlotHandler}
        views={["month", "week", "day"]}
        localizer={localizer}
        events={appointmentsRaw}
        startAccessor="start"
        defaultView={"day"}
        endAccessor="end"
        date={currentDate}
        style={{ height: 500 }}
        onNavigate={(date) => {
          setCurrentDate(date);
        }}
        titleAccessor={"desc"}
        onSelectEvent={eventSelectHandler}
      />
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
