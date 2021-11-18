import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import getHours from "date-fns/getHours";
// import getMinutes from "date-fns/getMinutes";
import {
  // getTheYear,
  // getTheMinutes,
  // getTheHours,
  // getTheDay,
  // getTheMonth,
  formatEventForCalendar,
} from "../Booking/utils";

import ModalProceedCancel from "../ModalProceedCancel";
import ModalConfirm from "../ModalConfirm";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import eu from "date-fns/locale/eu";

// import events from "./eventExamples";
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

  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [appointmentIsDeleted, setAppointmentIsDeleted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [appointments, setAppointments] = useState([]);
  const [appointmentsRaw, setAppointmentsRaw] = useState([]);
  const [isDeleteAppointment, setIsDeleteAppointment] = useState(false);

  const deleteModalMessage = "Would you like to delete this appointment ?";
  const confirmModalMessage = "Appointment deleted!";

  const getAppointments = () => {
    const appointmentsAPI = `/calendar/appointments/${props.user._id}`;

    axios.get(appointmentsAPI).then((response) => {
      console.log(response.data);
      const appointments = response.data.appointments.map((app) => {
        return formatEventForCalendar(app);
      });

      console.log(appointments);
      setAppointmentsRaw(appointments);
    });
  };

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, [appointmentIsDeleted]);

  const deleteModalDisplayHandler = () => {
    setIsDeleteAppointment(!isDeleteAppointment);
  };

  const confirmModalDisplayHandler = () => {
    setAppointmentIsDeleted(!appointmentIsDeleted);
  };

  const eventSelectHandler = (event) => {
    console.log(event);
    setSelectedAppointment(event.id);
    deleteModalDisplayHandler();
  };

  const deleteAppointment = () => {
    const deleteAppApi = `/calendar/delete-appointment/${selectedAppointment}`;
    axios.delete(deleteAppApi).then((response) => {
      console.log(response.data);
      deleteModalDisplayHandler();
      confirmModalDisplayHandler();
    });
  };

  // const selectSlotHandler = (event) => {
  //   console.log(event.start);
  //   setCurrentDate(event.start);
  // };

  return (
    <React.Fragment>
      {appointmentIsDeleted ? (
        <ModalConfirm show={confirmModalDisplayHandler} title={confirmModalMessage} />
      ) : undefined}
      {isDeleteAppointment ? (
        <ModalProceedCancel
          appId={selectedAppointment}
          proceed={deleteAppointment}
          cancel={deleteModalDisplayHandler}
          description={deleteModalMessage}
          show={deleteModalDisplayHandler}
        />
      ) : undefined}
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-4xl font-medium mb-20">Calendar</h1>
        <Calendar
          // toolbar={false}
          selectable={true}
          // onSelectSlot={selectSlotHandler}
          views={["month", "week", "day"]}
          localizer={localizer}
          events={appointmentsRaw}
          startAccessor="start"
          defaultView={"day"}
          endAccessor="end"
          date={currentDate}
          style={{ height: 500, width: 1000 }}
          onNavigate={(date) => {
            setCurrentDate(date);
          }}
          titleAccessor={"desc"}
          onSelectEvent={eventSelectHandler}
        />
        <Link to="/home/business">
          <button
            className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-20 border-2"
            onClick={props.onBackToMainClick}
          >
            Back to DashBoard
          </button>
        </Link>
      </div>
    </React.Fragment>
  );
}
