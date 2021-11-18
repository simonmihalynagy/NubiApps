import React, { useState } from "react";

import axios from "axios";

export default function Signup(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    firstName: "",
    lastName: "",
    //phone: "",
    password: "",
    email: "",
    type: "admin",
  });

  const inputChangeHandler = (event) => {
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
        return response.data.user
          ? (console.log(response.data), props.onSignup(response.data.user))
          : alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="mb-10 flex flex-col items-center">
        <div>
          <h1 className="text-center pt-10 text-2xl">Please Fill-Out The Form Below, To Register!</h1>
        </div>
        <div className="pt-10">
          <form className=" flex flex-col items-center" onSubmit={submitHandler}>
            <label className="text-xl text-gray-600">First Name</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="text"
              name="firstName"
              value={credentials.firstName}
              required
            />
            <label className="text-xl text-gray-600">Last Name</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="text"
              name="lastName"
              value={credentials.lastName}
              required
            />
            <label className="text-xl text-gray-600">Choose A Username</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="text"
              name="username"
              value={credentials.username}
              required
            />
            <label className="text-xl text-gray-600">Choose A Password</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="password"
              name="password"
              value={credentials.password}
              required
            />
            {/* <label>Your Phone Number</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="text"
              name="phone"
              value={credentials.phone}
              required
            /> */}
            <label className="text-xl text-gray-600">E-mail</label>
            <input
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              onChange={inputChangeHandler}
              type="email"
              name="email"
              value={credentials.email}
              required
            />

            <button
              className="hover:-translate-y-0.5 font-medium hover:bg-purple-400 transform py-6 px-6 rounded-xl text-xl bg-purple-600 text-white mt-10 border-2"
              type="submit"
            >
              Sign Up!
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
