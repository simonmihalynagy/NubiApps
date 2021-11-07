import React, { useState, useEffect } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";

export default function EditBusiness(props) {
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    location: "",
    start: "",
    finish: "",
  });
  //const [editBusinessError, setEditBusinessError] = useState("");

  // const getBusinessData = () => {
  //   const adminId = props.user._id;

  //   return axios
  //     .get(`/business/get-business-data/${adminId}`)
  //     .then((response) => {
  //       setBusinessData(response.data.foundBusiness);
  //     });
  // };

  const adminId = props.user._id;

  useEffect(() => {
    axios.get(`/business/get-business-data/${adminId}`).then((response) => {
      // console.log(
      //   "this is the foundbusiness from edit business api call",

      //   response.data
      // );
      setBusinessData(response.data.foundBusiness[0]);
    });
  }, []);

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    setBusinessData({
      ...businessData,
      [event.target.name]: value,
    });
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

  const submitHandler = (event) => {
    event.preventDefault();

    const businessId = businessData._id;

    axios
      .put(`/business/edit-business-data/${businessId}`, businessData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!businessData.name) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-col items-center ">
      <h1>You can edit your business data below:</h1>
      {/* {editBusinessError && <div style={{ color: "red" }}>{editBusinessError}</div>} */}

      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Current name:</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={businessData.name}
          placeholder={businessData.name}
        />
        <label>Current email address:</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="email"
          value={businessData.email}
          placeholder={businessData.email}
        />
        <label>Current location:</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="location"
          value={businessData.location}
          placeholder={businessData.location}
        />
        <label>Choose your opening hour:</label>
        <TimePicker name="start" value={businessData.start} onChange={handleStartTimeInput} />
        <label>What time are you closing?</label>
        <TimePicker name="finish" value={businessData.finish} onChange={handleClosingTimeInput} />
        <button className=" rounded bg-purple-600 text-white  border-2 border-black" type="submit">
          Save changes!
        </button>
      </form>
      <button className=" rounded  border-2 border-black" onClick={props.onBackToMainClick}>
        Back to DashBoard
      </button>
    </div>
  );
}
