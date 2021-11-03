import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";

export default function Booking(props) {
  console.log(props.match.params);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  //const [timeSlots, setTimeSlots] = useState(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 17));

  //**IF THERE IS ONLY ONE OPTION IN "SELECT" INPUT, MAKE SURE TO SET THAT AS DEFAULT SELECTED ITEM!!!!!! */

  const [bookingData, setbookingData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientPhoneNumber: "",
    clientEmail: "",
    chosenEmployee: "",
    chosenService: "",
  });

  const getData = () => {
    const servicesAPI = `/booking/get-services/${props.match.params.businessId}`;
    const employeesAPI = `/booking/employees/${props.match.params.businessId}`;

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

  const bookingDataInputChangeHandler = (event) => {
    const value = event.target.value;
    setbookingData({
      ...bookingData,
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    getData();
  }, []);

  console.log(startDate.toLocaleString());

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-2/5">
        <label>First Name</label>
        <input
          onChange={bookingDataInputChangeHandler}
          type="text"
          name="clientFirstName"
          id=""
          value={bookingData.clientFirstName}
        />
        <label>Last Name</label>
        <input
          onChange={bookingDataInputChangeHandler}
          type="text"
          name="clientLastName"
          id=""
          value={bookingData.clientLastName}
        />
        <label>Phone number</label>
        <input
          onChange={bookingDataInputChangeHandler}
          type="text"
          name="clientPhoneNumber"
          id=""
          value={bookingData.clientPhoneNumber}
        />
        <label>Email</label>
        <input
          onChange={bookingDataInputChangeHandler}
          type="email"
          name="clientEmail"
          id=""
          value={bookingData.clientEmail}
        />
        <label>select your provider</label>
        <select onChange={bookingDataInputChangeHandler} name="chosenEmployee">
          {employees.map((employee) => {
            return (
              <option value={employee._id} key={employee._id}>
                {employee.firstName}
              </option>
            );
          })}
        </select>
        <label>select a service</label>
        <select onChange={bookingDataInputChangeHandler} name="chosenService">
          {services.map((service) => {
            return (
              <option value={service._id} key={service._id}>
                {service.name}
              </option>
            );
          })}
        </select>
        <label>pick a date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          minTime={setHours(setMinutes(new Date(), 0), 10)}
          maxTime={setHours(setMinutes(new Date(), 0), 17)}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button className="mt-4 border-2 rounded border-red-600" type="submit">
          Book appointment!
        </button>
      </form>
    </div>
  );
}
