import React, { useState } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";

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
    <div className="flex flex-col items-center ">
      <h1>Please fill-out the form below to create your business:</h1>
      {saveBusinessError && <div style={{ color: "red" }}>{saveBusinessError}</div>}
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Name your business:</label>
        <input onChange={inputChangeHandler} type="text" name="name" value={businessData.name} />
        <label>Please enter an email address:</label>
        <input onChange={inputChangeHandler} type="text" name="email" value={businessData.email} />
        <label>Please enter the location on your business</label>
        <input onChange={inputChangeHandler} type="text" name="location" value={businessData.location} />
        <label>Choose your opening hour:</label>
        <TimePicker name="start" value="00:00" onChange={handleStartTimeInput} />
        <label>What time are you closing?</label>
        <TimePicker name="finish" value="00:00" onChange={handleClosingTimeInput} />

        <button className=" rounded bg-purple-600 text-white  border-2 border-black" type="submit">
          Create business!
        </button>
      </form>
      <button className=" rounded  border-2 border-black" onClick={props.onBackToMainClick}>
        Back to DashBoard
      </button>
    </div>
  );
}
