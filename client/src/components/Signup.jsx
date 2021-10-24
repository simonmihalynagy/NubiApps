import React, { useState } from "react";

import axios from "axios";

export default function Signup(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
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
      <div className="flex flex-col items-center">
        <div>
          <h1 className="pt-10 text-2xl">
            Please Fill-Out The Form Below, To Register!
          </h1>
        </div>
        <div className="pt-10">
          <form className="flex flex-col items-center" onSubmit={submitHandler}>
            <label>Your First Name</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="firstName"
              value={credentials.firstName}
            />
            <label>Your Last Name</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="lastName"
              value={credentials.lastName}
            />
            <label>Choose A Username</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="username"
              value={credentials.username}
            />
            <label>Choose A Password</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
              value={credentials.password}
            />
            <label>Your Phone Number</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="phone"
              value={credentials.phone}
            />
            <label>Your E-mail Address</label>
            <input
              onChange={inputChangeHandler}
              type="email"
              name="email"
              value={credentials.email}
            />

            <button
              className="rounded bg-purple-600 text-white mt-10 border-2 border-black"
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
