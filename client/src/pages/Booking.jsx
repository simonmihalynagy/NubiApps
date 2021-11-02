import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";

export default function Booking(props) {
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 17));

  // const getData = async () => {
  //   await Promise.all([getServices(), getEmployees()]).then((result) => {
  //     console.log(result);
  //   });
  // };

  const getData = () => {
    const servicesAPI = `/business/get-services/${props.user._id}`;
    const employeesAPI = `/business/staff-members/${props.user._id}`;

    const getServices = axios.get(servicesAPI);
    const getEmployees = axios.get(employeesAPI);

    axios.all([getServices, getEmployees]).then(
      axios.spread((...allData) => {
        //console.log(allData);
        setServices(allData[0].data.foundServices);
        setEmployees(allData[1].data.foundStaffMembers);
      })
    );
  };

  useEffect(() => {
    // eslint-disable-next-line
    getData();
  }, []);

  return (
    <div className="felx justify-center">
      <form className="flex flex-col w-2/5">
        <label>select your provider</label>
        <select name="chosenEmployee">
          {employees.map((employee) => {
            return <option>{employee.firstName}</option>;
          })}
        </select>
        <label>select a service</label>
        <select name="chosenService">
          {services.map((service) => {
            return <option>{service.name}</option>;
          })}
        </select>
        <label>pick a date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          minTime={setHours(setMinutes(new Date(), 0), 17)}
          maxTime={setHours(setMinutes(new Date(), 30), 20)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </form>
    </div>
  );
}
