import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
// import DatePicker from "react-datepicker";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import TimeSlotContainer from "../components/Booking/TimeSlotContainer";
import "react-datepicker/dist/react-datepicker.css";
import ModalConfirm from "../components/ModalConfirm";

//**props for timeslots container: businessStart, Employees appointments to check through, duration of services,  */

export default function Booking(props) {
  const [clickedTimeSlot, setClickedTimeSlot] = useState("");
  const [bookingError, setBookingError] = useState(false);
  // console.log("props.match . params :", props.match.params);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [businessHours, setBusinessHours] = useState({});

  //const [timeSlots, setTimeSlots] = useState(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  //console.log(startDate);

  //**IF THERE IS ONLY ONE OPTION IN "SELECT" INPUT, MAKE SURE TO SET THAT AS DEFAULT SELECTED ITEM!!!!!! */

  const [bookingData, setbookingData] = useState({
    business: props.match.params.businessId,
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
    const businessAPI = `/booking/get-business-data/${props.match.params.businessId}`;

    const getServices = axios.get(servicesAPI);
    const getEmployees = axios.get(employeesAPI);
    const getBusinessData = axios.get(businessAPI);

    axios.all([getServices, getEmployees, getBusinessData]).then(
      axios.spread((...allData) => {
        //console.log(allData);

        setServices(allData[0].data.foundServices);
        setEmployees(allData[1].data.foundStaffMembers);
        setBusinessHours({ start: allData[2].data.foundBusiness.start, finish: allData[2].data.foundBusiness.finish });
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
    } else if (event.target.name === "chosenService") {
      const service = services.find((service) => {
        return service._id === event.target.value;
      });
      setbookingData({
        ...bookingData,
        duration: service.duration,
        [event.target.name]: value,
      });
      console.log(service);
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

  const submitBookingHandler = (event) => {
    event.preventDefault();

    if (Object.values(bookingData).includes("")) {
      setBookingError(true);
    } else {
      axios.post(`/booking/book-appointment/${props.match.params.businessId}`, bookingData).then((response) => {
        console.log(response);
        setbookingData({
          ...bookingData,
          date: "",
          start: "",
          duration: "",
          clientFirstName: "",
          clientLastName: "",
          clientPhoneNumber: "",
          clientEmail: "",
          chosenEmployee: "",
          chosenService: "",
        });
        confirmModalDisplayHandler();
      });
    }
  };

  const timeSlotClickHandler = (event) => {
    // console.log("hello from timeSlotClickHandler");
    setClickedTimeSlot(event.target.value);
    bookingDataInputChangeHandler(event);
  };

  const confirmModalDisplayHandler = () => {
    setShowConfirm(!showConfirm);
  };

  const confirmMessage = "Appointment booked, happy days!";

  return (
    <div>
      {showConfirm ? <ModalConfirm show={confirmModalDisplayHandler} title={confirmMessage} /> : undefined}
      {isLoading ? (
        <div>
          <h1>loading!!!!!</h1>
        </div>
      ) : (
        <div className="flex justify-center">
          {bookingError ? <h1 className="text-red-600">please provide all the necessary data!</h1> : undefined}
          <form
            onSubmit={submitBookingHandler}
            className="focus:border-purple-600 flex flex-col w-2/5 text-center justify-items-center"
          >
            <h1 className="text-4xl font-medium my-20">Book Your Appointment!</h1>
            <label className="text-xl text-gray-600">First Name</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              type="text"
              name="clientFirstName"
              id=""
              value={bookingData.clientFirstName}
            />
            <label className="text-xl text-gray-600">Last Name</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              type="text"
              name="clientLastName"
              id=""
              value={bookingData.clientLastName}
            />
            <label className="text-xl text-gray-600">Phone number</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              type="text"
              name="clientPhoneNumber"
              id=""
              value={bookingData.clientPhoneNumber}
            />
            <label className="text-xl text-gray-600">Email</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              type="email"
              name="clientEmail"
              id=""
              value={bookingData.clientEmail}
            />
            <label className="text-xl text-gray-600">select your provider</label>
            <select
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              name="chosenEmployee"
            >
              <option value="" defaultValue></option>
              {employees.map((employee) => {
                return (
                  <option value={employee._id} key={employee._id}>
                    {employee.firstName}
                  </option>
                );
              })}
            </select>
            <label className="text-xl text-gray-600">select a service</label>

            <select
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={bookingDataInputChangeHandler}
              name="chosenService"
            >
              <option defaultValue value=""></option>
              {services.map((service) => {
                return (
                  <option value={service._id} key={service._id}>
                    {service.name}
                  </option>
                );
              })}
            </select>

            <label className="text-xl text-gray-600">Date</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              type="date"
              min="01-01-2021"
              max="31-12-2022"
              name="date"
              value={bookingData.date}
              onChange={bookingDataInputChangeHandler}
            />

            {bookingData.chosenEmployee !== "" ? (
              bookingData.date !== "" ? (
                bookingData.chosenService !== "" ? (
                  <div className="flex flex-col justify-items-center">
                    <TimeSlotContainer
                      businessHours={businessHours}
                      klickedTimeSlot={clickedTimeSlot}
                      timeSlotClickHandler={timeSlotClickHandler}
                      inputChangeHandler={bookingDataInputChangeHandler}
                      chosenEmployee={bookingData.chosenEmployee}
                      chosenDate={bookingData.date}
                      chosenService={bookingData.chosenService}
                    />
                    <button
                      className="mt-20 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white  border-2"
                      type="submit"
                    >
                      Book appointment!
                    </button>
                  </div>
                ) : undefined
              ) : undefined
            ) : undefined}
          </form>
        </div>
      )}
    </div>
  );
}
