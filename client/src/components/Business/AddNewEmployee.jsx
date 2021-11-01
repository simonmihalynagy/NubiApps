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
    });
  };

  return (
    <React.Fragment>
      <h1>Add New Employee:</h1>
      <form className="flex flex-col items-center" onSubmit={submitHandler}>
        <label>Choose a Username</label>
        <input onChange={inputChangeHandler} type="text" name="username" value={employeeData.username} />
        <label>Choose a password</label>
        <input onChange={inputChangeHandler} type="password" name="password" value={employeeData.password} />
        <label>First name of Employee</label>
        <input onChange={inputChangeHandler} type="text" name="firstName" value={employeeData.firstName} />
        <label>Last name of Employee</label>
        <input onChange={inputChangeHandler} type="text" name="lastName" value={employeeData.lastName} />
        <label>Email</label>
        <input onChange={inputChangeHandler} type="text" name="email" value={employeeData.email} />
        <button className="rounded border-2 border-black bg-purple-600 text-white" type="submit">
          Add employee
        </button>
      </form>
    </React.Fragment>
  );
}
