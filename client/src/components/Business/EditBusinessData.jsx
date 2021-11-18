import React, { useState, useEffect } from "react";
import axios from "axios";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";

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

  // if (!businessData.name) {
  //   return <div>Loading..</div>;
  // }

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl font-medium mt-10 mb-10">You can edit your business data below:</h1>
      {/* {editBusinessError && <div style={{ color: "red" }}>{editBusinessError}</div>} */}

      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label className="mb-2 text-xl text-gray-600">Name:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={businessData.name}
          placeholder={businessData.name}
        />
        <label className="mb-2 text-xl text-gray-600">Email:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="email"
          value={businessData.email}
          placeholder={businessData.email}
        />
        <label className="mb-2 text-xl text-gray-600">Location:</label>
        <input
          className="text-center mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="location"
          value={businessData.location}
          placeholder={businessData.location}
        />
        <label className="mb-2 text-xl text-gray-600">Opening hour:</label>
        <TimePicker
          disableClock={true}
          className="mb-5 "
          name="start"
          value={businessData.start}
          onChange={handleStartTimeInput}
        />
        <label className="mb-2 text-xl text-gray-600">Cosing hour:</label>
        <TimePicker
          disableClock={true}
          className="mb-5"
          name="finish"
          value={businessData.finish}
          onChange={handleClosingTimeInput}
        />
        <button className="mb-20 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
          Save changes!
        </button>
      </form>
      <Link to="/home/business">
        <button
          className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
          onClick={props.onBusinessSave}
          onClick={props.onBackToMainClick}
        >
          Back to DashBoard
        </button>
      </Link>
    </div>
  );
}
