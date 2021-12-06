import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

//TAILWIND
export const inputStyle = "mb-6 shadow-xl rounded-lg focus:outline-purple-500";
export const buttonStyle =
  "hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2";

export const labelStyle = "text-xl text-gray-600";

//COMPONENT FUNCTION

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    axios
      .post("/auth/login", data)
      .then((response) => {
        if (response.data.user) {
          console.log(response.data);
          props.onLogin(response.data.user);
        } else {
          setLoginError(response.data.message);
        }
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

        <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
          <label className={labelStyle}> Username</label>
          <input className={inputStyle} type="text" name="username" required {...register("username")} />
          <label className={labelStyle}>Password</label>
          <input {...register("password")} className={inputStyle} type="password" required />

          <button className={buttonStyle} type="submit">
            Log-in
          </button>
        </form>
        <p className="mt-10 text-xl text-gray-600">Or sign-up first:</p>
        <Link to="/signup">
          <button className={buttonStyle}>Sign-Up</button>
        </Link>
      </div>
    </div>
  );
}
