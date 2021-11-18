import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

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
      .post("/auth/login", credentials)
      .then((response) => {
        if (response.data.user) {
          console.log(response.data);
          props.onLogin(response.data.user);
        } else {
          setLoginError(response.data.message);
        }

        // response.data.user
        //   ? props.onLogin(response.data.user)
        //   : (setLoginFailed(true),
        //     alert(
        //       "the password or/and username you entered are invalid, please try again"
        //     ));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center ">
        <h1 className="flex content-center text-2xl mt-10 mb-10">Please Log-In!</h1>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}

        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <label className="text-xl text-gray-600"> Username</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHangler}
            type="text"
            name="username"
            value={credentials.username}
            required
          />
          <label className="text-xl text-gray-600">Password</label>
          <input
            className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
            onChange={inputChangeHangler}
            type="password"
            name="password"
            value={credentials.password}
            required
          />

          <button
            className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-9 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
            type="submit"
          >
            Log-in
          </button>
        </form>
        <p className="mt-10 text-xl text-gray-600">Or sign-up first:</p>
        <Link to="/signup">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Sign-Up
          </button>
        </Link>
      </div>
    </div>
  );
}
