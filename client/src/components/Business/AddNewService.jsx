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
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Name of service</label>
        <input onChange={inputChangeHandler} type="text" name="name" value={serviceData.name} />
        <label>Description</label>
        <input onChange={inputChangeHandler} type="text" name="description" value={serviceData.description} />
        <label>Image</label>
        <input onChange={inputChangeHandler} type="text" name="image" value={serviceData.image} />
        <label>Duration in minutes</label>
        <input
          onChange={inputChangeHandler}
          name="duration"
          value={serviceData.duration === "" ? "0" : serviceData.duration}
          type="number"
          min="0"
          step="1"
          max="60"
        />

        <label>Cost (EUR)</label>
        <input
          onChange={inputChangeHandler}
          type="number"
          name="cost"
          value={serviceData.cost === "" ? "0" : serviceData.cost}
          min="0"
          step="1"
          max="100"
        />
        <button className="rounded border-2 border-black bg-purple-600 text-white" type="submit">
          Add Service
        </button>
      </form>
    </React.Fragment>
  );
}
