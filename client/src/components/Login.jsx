import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const inputChangeHangler = (event) => {
    const value = event.target.value;
    setCredentials({
      ...credentials,
      [event.target.name]: value,
    });
  };

  // const login = () => {

  // };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", credentials)
      .then((response) => {
        //console.log(response.data);
        props.onLogin(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter Username</label>
        <input
          onChange={inputChangeHangler}
          type="text"
          name="username"
          value={credentials.username}
        />
        <label>Enter Password</label>
        <input
          onChange={inputChangeHangler}
          type="password"
          name="password"
          value={credentials.password}
        />
        <button type="submit">Sign in!</button>
      </form>
    </div>
  );
}
