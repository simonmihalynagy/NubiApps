import React, { useState } from "react";
import axios from "axios";

export default function AddNewService(props) {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    image: "",
    duration: "",
    cost: "",
  });

  const inputChangeHandler = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    setServiceData({
      ...serviceData,
      [event.target.name]: value,
    });
  };

  // const numberInputChangeHandler = (event) => {
  //   //console.log(typeof event.target.value);
  //   //const numString = event.target.value.toString();
  //   setServiceData({
  //     ...serviceData,
  //     [event.target.name]: ,
  //   });
  // };

  const submitHandler = (event) => {
    console.log(props.user._id);
    event.preventDefault();
    props.setIsSubmitting(true);
    axios.post(`/business/add-service/${props.user._id}`, serviceData).then((response) => {
      props.setIsSubmitting(false);
      console.log(response.data);
      setServiceData({
        name: "",
        description: "",
        image: "",
        duration: "",
        cost: "",
      });
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <h1 className="text-4xl my-20 font-medium">Add New Service</h1>
          <label className="text-xl text-gray-600">Name of service</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="name"
            value={serviceData.name}
          />
          <label className="text-xl text-gray-600">Description</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="description"
            value={serviceData.description}
          />
          {/* <label className="text-xl text-gray-600">Image</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="image"
          value={serviceData.image}
        /> */}
          <label className="text-xl text-gray-600">Duration in minutes</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            name="duration"
            value={serviceData.duration === "" ? "0" : serviceData.duration}
            type="number"
            min="0"
            step="1"
            max="720"
          />

          {/* <label className="text-xl text-gray-600">Cost (EUR)</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="number"
          name="cost"
          value={serviceData.cost === "" ? "0" : serviceData.cost}
          min="0"
          step="1"
          max="100"
        /> */}
          <button className="mt-5 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white  border-2">
            Add Service
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
