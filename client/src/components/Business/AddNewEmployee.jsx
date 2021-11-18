import React, { useState } from "react";
import axios from "axios";

export default function AddNewEmployee(props) {
  const [employeeData, setEmployeeData] = useState({
    username: "",
    password: "", // hashed
    firstName: "",
    lastName: "",
    email: "",
    type: "employee",
  });

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    setEmployeeData({
      ...employeeData,
      [event.target.name]: value,
    });
  };

  const submitHandler = (event) => {
    //console.log(props.user._id);
    event.preventDefault();
    props.setIsSubmitting(true);
    axios.post(`/business/add-employee/${props.user._id}`, employeeData).then((response) => {
      props.setIsSubmitting(false);
      console.log(response.data);
      setEmployeeData({
        username: "",
        password: "", // hashed
        firstName: "",
        lastName: "",
        email: "",
        type: "employee",
      });
    });
  };

  return (
    <React.Fragment>
      <div id="hello" className="flex flex-col justify-center items-center">
        <h1 className="my-10 font-medium text-4xl">Add New Employee:</h1>
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <label className="text-xl text-gray-600">Choose a Username</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="username"
            value={employeeData.username}
          />
          <label className="text-xl text-gray-600">Choose a password</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="password"
            name="password"
            value={employeeData.password}
          />
          <label className="text-xl text-gray-600">First name of Employee</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="firstName"
            value={employeeData.firstName}
          />
          <label className="text-xl text-gray-600">Last name of Employee</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="lastName"
            value={employeeData.lastName}
          />
          <label className="text-xl text-gray-600">Email</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHandler}
            type="text"
            name="email"
            value={employeeData.email}
          />
          <button
            className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
            type="submit"
          >
            Add employee
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
