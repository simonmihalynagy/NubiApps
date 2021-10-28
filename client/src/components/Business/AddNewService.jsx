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
    const value = event.target.value;
    setServiceData({
      ...serviceData,
      [event.target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(`/business/add-service/${props.user._id}`, serviceData)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <React.Fragment>
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Name of service</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={serviceData.name}
        />
        <label>Description</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="description"
          value={serviceData.description}
        />
        <label>Image</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="image"
          value={serviceData.image}
        />
        <label>Duration</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="duration"
          value={serviceData.duration}
        />
        <label>Cost</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="cost"
          value={serviceData.cost}
        />
        <button
          className="rounded border-2 border-black bg-purple-600 text-white"
          type="submit"
        >
          Add Service
        </button>
      </form>
    </React.Fragment>
  );
}
