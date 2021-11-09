import React, { useState } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

// import "react-big-calendar/lib/sass/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles"; // if using DnD

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import eu from "date-fns/locale/eu";

import events from "./eventExamples";

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
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <h1>Schedule setup comes here</h1>
      <Calendar
        // toolbar={false}
        views={["month", "week", "day"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        defaultView={"day"}
        endAccessor="end"
        date={currentDate}
        style={{ height: 500 }}
        onNavigate={(date) => {
          console.log(date);
        }}
      />
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
