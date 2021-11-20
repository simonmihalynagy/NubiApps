import React, { useState } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";
import ModalConfirm from "../ModalConfirm";

export default function CreateBusiness(props) {
  //**STATES */

  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    location: "",
    adminId: props.user._id,
    start: "",
    finish: "",
  });

  const [isCreated, setIsCreated] = useState(false);
  const modalMessage = "Business Created!";

  const [saveBusinessError, setSaveBusinessError] = useState("");

  //**HANDLERS */

  const businessCreatedHandler = () => {
    setIsCreated(!isCreated);
  };

  const handleStartTimeInput = (time) => {
    setBusinessData({
      ...businessData,
      start: time,
    });
  };
  const handleClosingTimeInput = (time) => {
    setBusinessData({
      ...businessData,
      finish: time,
    });
  };

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    setBusinessData({
      ...businessData,
      [event.target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("/business/create", businessData)
      .then((response) => {
        if (response.data.business) {
          props.onBusinessSave();
          console.log(response.data);
          businessCreatedHandler();
        } else {
          setSaveBusinessError(response.data.message);
        }

        // response.data.user
        //   ? props.onLogin(response.data.user)
        //   : (setLoginFailed(true),
        //     alert(
        //       "the password or/and username you entered are invalid, please try again"
        //     ));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center text-center ">
      {isCreated ? <ModalConfirm title={modalMessage} show={businessCreatedHandler} /> : undefined}
      <h1 className="text-4xl font-medium mt-10 mb-10">Please fill-out the form below to create your business:</h1>
      {saveBusinessError && <div style={{ color: "red" }}>{saveBusinessError}</div>}
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label className="mb-2 text-xl text-gray-600">Name of your company:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={businessData.name}
          required
        />
        <label className="mb-2 text-xl text-gray-600">Email address:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="email"
          value={businessData.email}
          required
        />
        <label className="mb-2 text-xl text-gray-600">Please enter a location/address if you have one:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="location"
          value={businessData.location}
          required
        />
        <label className="mb-2 text-xl mt-10 text-gray-600">Opening time:</label>
        <TimePicker
          disableClock={true}
          className="mb-5"
          name="start"
          value="00:00"
          onChange={handleStartTimeInput}
          required
        />
        <label className="mb-2 text-xl text-gray-600">Closing time:</label>
        <TimePicker
          disableClock={true}
          className="mb-10"
          name="finish"
          value="00:00"
          onChange={handleClosingTimeInput}
          required
        />

        <button
          onClick={props.onBusinessSave}
          className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
        >
          Create business!
        </button>
      </form>
      <Link to="/home/business">
        <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
          Back to DashBoard
        </button>
      </Link>
    </div>
  );
}
