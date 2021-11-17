import React, { useState } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";

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

  const [saveBusinessError, setSaveBusinessError] = useState("");

  //**HANDLERS */

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
          console.log(response.data);
          props.onBackToMainClick();
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
      <h1 className="text-2xl mb-10">Please fill-out the form below to create your business:</h1>
      {saveBusinessError && <div style={{ color: "red" }}>{saveBusinessError}</div>}
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Name your business:</label>
        <input onChange={inputChangeHandler} type="text" name="name" value={businessData.name} required />
        <label>Please enter an email address:</label>
        <input onChange={inputChangeHandler} type="text" name="email" value={businessData.email} required />
        <label>Please enter the location on your business</label>
        <input onChange={inputChangeHandler} type="text" name="location" value={businessData.location} required />
        <label>Choose your opening hour:</label>
        <TimePicker name="start" value="00:00" onChange={handleStartTimeInput} required />
        <label>What time are you closing?</label>
        <TimePicker name="finish" value="00:00" onChange={handleClosingTimeInput} required />

        <button className=" rounded bg-purple-600 text-white  border-2 border-black mt-5" type="submit">
          Create business!
        </button>
      </form>
      <Link to="/home/business">
        <button className=" rounded  border-2 border-black mt-5" onClick={props.onBackToMainClick}>
          Back to DashBoard
        </button>
      </Link>
    </div>
  );
}
