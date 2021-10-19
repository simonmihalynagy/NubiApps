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
        props.setCurrentUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="text-6xl flex justify-center items-center h-60">
        <h1>Please Log-In!</h1>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <label className="pt-6 pb-2 text-2xl">Enter Username</label>
        <input
          className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
          onChange={inputChangeHangler}
          type="text"
          name="username"
          value={credentials.username}
        />
        <label className="pt-6 pb-2 text-2xl">Enter Password</label>
        <input
          className="border-gray-300 rounded-lg shadow-md focus:ring-purple-600"
          onChange={inputChangeHangler}
          type="password"
          name="password"
          value={credentials.password}
        />
        <button
          className="m-10 rounded-lg p-6 h-20
             text-white bg-purple-600 text-2xl"
          type="submit"
        >
          Sign in!
        </button>
      </form>
    </div>
  );
}
