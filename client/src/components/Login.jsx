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
        <h1 className="flex content-center text-2xl mt-10 mb-10">
          Please Log-In!
        </h1>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}

        <form className="flex flex-col items-center" onSubmit={submitHandler}>
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

          <button
            className="w-4/12 rounded bg-purple-600 text-white mt-10 border-2 border-black"
            type="submit"
          >
            Sign in!
          </button>
        </form>
        <p className="pt-4 ">or sign-up first:</p>
        <Link to="/signup">
          <button className=" rounded bg-purple-600 text-white  border-2 border-black">
            Sign-Up
          </button>
        </Link>
      </div>
    </div>
  );
}
