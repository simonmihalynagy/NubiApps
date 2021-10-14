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
        //props.onLogin(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Your First Name</label>
        <input
          onChange={inputChangeHangler}
          type="text"
          name="firstName"
          value={credentials.firstName}
        />
        <label>Your Last Name</label>
        <input
          onChange={inputChangeHangler}
          type="text"
          name="lastName"
          value={credentials.lastName}
        />
        <label>Choose A Username</label>
        <input
          onChange={inputChangeHangler}
          type="text"
          name="username"
          value={credentials.username}
        />
        <label>Choose A Password</label>
        <input
          onChange={inputChangeHangler}
          type="password"
          name="password"
          value={credentials.password}
        />
        <label>Your Phone Number</label>
        <input
          onChange={inputChangeHangler}
          type="text"
          name="phone"
          value={credentials.phone}
        />
        <label>Your E-mail Address</label>
        <input
          onChange={inputChangeHangler}
          type="email"
          name="email"
          value={credentials.email}
        />
        <button type="submit">Sign Up!</button>
      </form>
    </div>
  );
}
