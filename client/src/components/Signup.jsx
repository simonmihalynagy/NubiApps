import React, { useState } from "react";
import axios from "axios";

export default function Signup(props) {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  const inputChangeHangler = (event) => {
    const value = event.target.value;
    setCredentials({
      ...credentials,
      [event.target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/auth/signup", credentials)
      .then((response) => {
        console.log(response.data);
        props.onLogin(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="text-6xl flex justify-center items-center h-60">
        <h1>Please Fill-Out The Form Below, To Register Your Business</h1>
      </div>
      <div className="flex justify-center h-60">
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <label className="p-6">Your First Name</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="text"
            name="firstName"
            value={credentials.firstName}
          />
          <label className="p-6">Your Last Name</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="text"
            name="lastName"
            value={credentials.lastName}
          />
          <label className="p-6">Choose A Username</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="text"
            name="username"
            value={credentials.username}
          />
          <label className="p-6">Choose A Password</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="password"
            name="password"
            value={credentials.password}
          />
          <label className="p-6">Your Phone Number</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="text"
            name="phone"
            value={credentials.phone}
          />
          <label className="p-6">Your E-mail Address</label>
          <input
            className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
            onChange={inputChangeHangler}
            type="email"
            name="email"
            value={credentials.email}
          />

          <button
            className="m-10 rounded-lg p-6 h-40
             text-white bg-purple-600 text-2xl"
            type="submit"
          >
            Sign Up!
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
