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
    props.setIsSubmitting(true);
    axios.put(`/business/edit-service/${props.singleService._id}`, serviceData).then((response) => {
      console.log(response.data);
      props.onSaveChangesClick();
      props.setIsSubmitting(false);
    });
  };

  return (
    <React.Fragment>
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <h1 className="text-4xl font-medium my-20">Edit Service</h1>
        <label className="text-xl text-gray-600">Name of service</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="name"
          value={serviceData.name}
          placeholder={props.singleService.name}
        />
        <label className="text-xl text-gray-600">Description</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="description"
          value={serviceData.description}
          placeholder={props.singleService.description}
        />
        {/* <label className="text-xl text-gray-600">Image</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="image"
          value={serviceData.image}
          placeholder={props.singleService.image}
        /> */}
        <label className="text-xl text-gray-600">Duration</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          onChange={inputChangeHandler}
          type="text"
          name="duration"
          value={serviceData.duration}
          placeholder={props.singleService.duration}
        />
        {/* <label className="text-xl text-gray-600">Cost</label>
        <input
          onChange={inputChangeHandler}
          type="text"
          name="cost"
          value={serviceData.cost}
          placeholder={props.singleService.cost}
        /> */}

        <button className="mt-5 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-l bg-purple-600 text-white  border-2">
          Save Changes
        </button>
      </form>
    </React.Fragment>
  );
}
