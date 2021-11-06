import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
// import DatePicker from "react-datepicker";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import TimeSlotContainer from "../components/Booking/TimeSlotContainer";
import "react-datepicker/dist/react-datepicker.css";

//**props for timeslots container: businessStart, Employees appointments to check through, duration of services,  */

export default function Booking(props) {
  const [clickedTimeSlot, setClickedTimeSlot] = useState("");
  const [bookingError, setBookingError] = useState(false);
  //console.log(props.match.params);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);

  //const [timeSlots, setTimeSlots] = useState(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  //console.log(startDate);

  //**IF THERE IS ONLY ONE OPTION IN "SELECT" INPUT, MAKE SURE TO SET THAT AS DEFAULT SELECTED ITEM!!!!!! */

  const [bookingData, setbookingData] = useState({
    date: "",
    start: "",
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
        setIsLoading(false);
      })
    );
  };

  const bookingDataInputChangeHandler = (event) => {
    //console.log(event);
    setBookingError(false);
    const value = event.target.value;

    if (event.name === "date") {
      setbookingData({
        ...bookingData,
        [event.target.name]: new Date(value),
      });
    } else {
      setbookingData({
        ...bookingData,
        [event.target.name]: value,
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      getData();
    }
    // eslint-disable-next-line
  }, []);

  //console.log(startDate.toLocaleString());

  const submitBookingHandler = (event) => {
    event.preventDefault();

    if (Object.values(bookingData).includes("")) {
      setBookingError(true);
    } else {
      axios.post("/booking/book-appointment", bookingData).then((response) => {
        console.log(response);
        setbookingData({
          date: "",
          start: "",
          clientFirstName: "",
          clientLastName: "",
          clientPhoneNumber: "",
          clientEmail: "",
          chosenEmployee: "",
          chosenService: "",
        });
      });
    }
  };

  const timeSlotClickHandler = (event) => {
    setClickedTimeSlot(event.target.value);
    props.inputChangeHandler(event);
  };

  //console.log(services[0]._id);
  return (
    <div>
      {isLoading ? (
        <h1>loading!!!</h1>
      ) : (
        <div className="flex justify-center">
          {bookingError ? <h1 className="text-red-600">please provide all the necessary data!</h1> : undefined}
          <form onSubmit={submitBookingHandler} className="flex flex-col w-2/5">
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
              <option value="" defaultValue></option>
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
              <option value="" defaultValue></option>
              {services.map((service) => {
                return (
                  <option value={service._id} key={service._id}>
                    {service.name}
                  </option>
                );
              })}
            </select>
            <label>pick a date</label>
            <label>Date</label>
            <input
              type="date"
              min="01-01-2021"
              max="31-12-2022"
              name="date"
              value={bookingData.date}
              onChange={bookingDataInputChangeHandler}
            />
            {/* (event) => {
            //console.log(event.target.value)
            setSelectedDate(event.target.value);
            setbookingData({
              ...bookingData,
              date: event.target.value,
            });
          } */}
            {bookingData.chosenEmployee !== "" ? (
              bookingData.date !== "" ? (
                <div>
                  <TimeSlotContainer
                    timeSlotClickHandler={timeSlotClickHandler}
                    inputChangeHandler={bookingDataInputChangeHandler}
                    chosenEmployee={bookingData.chosenEmployee}
                    chosenDate={bookingData.date}
                    chosenService={bookingData.chosenService}
                  />
                  <button className="mt-4 border-2 rounded border-red-600" type="submit">
                    Book appointment!
                  </button>
                </div>
              ) : undefined
            ) : undefined}
          </form>
        </div>
      )}
    </div>
  );
}
