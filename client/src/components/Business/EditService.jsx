import React, { useState } from "react";
import axios from "axios";
export default function EditService(props) {
  const [serviceData, setServiceData] = useState(props.singleService);

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
      .put(`/business/edit-service/${props.singleService._id}`, serviceData)
      .then((response) => {
        console.log(response.data);
        props.onSaveChangesClick();
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
          placeholder={props.singleService.name}
        />
        <label>Description</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="description"
          value={serviceData.description}
          placeholder={props.singleService.description}
        />
        <label>Image</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="image"
          value={serviceData.image}
          placeholder={props.singleService.image}
        />
        <label>Duration</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="duration"
          value={serviceData.duration}
          placeholder={props.singleService.duration}
        />
        <label>Cost</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="cost"
          value={serviceData.cost}
          placeholder={props.singleService.cost}
        />

        <button
          className="rounded border-2 border-black bg-purple-600 text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </React.Fragment>
  );
}
