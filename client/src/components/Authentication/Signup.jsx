import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

//TAILWIND

import { inputStyle } from "./Login";
import { buttonStyle } from "./Login";
import { labelStyle } from "./Login";

//COMPNENT FUNCTION

export default function Signup(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/auth/signup", { ...data, type: "admin" })
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
    <>
      <div className="mb-10 flex flex-col items-center">
        <div>
          <h1 className="text-center pt-10 text-2xl">Please Fill-Out The Form Below, To Register!</h1>
        </div>
        <div className="pt-10">
          <form className=" flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <label className={labelStyle}>First Name</label>
            <input {...register("firstName")} className={inputStyle} type="text" required />
            <label className={labelStyle}>Last Name</label>
            <input {...register("lastName")} className={inputStyle} type="text" required />
            <label className={labelStyle}>Choose A Username</label>
            <input {...register("username")} className={inputStyle} type="text" required />
            <label className={labelStyle}>Choose A Password</label>
            <input {...register("password")} className={inputStyle} type="password" required />

            <label className={labelStyle}>E-mail</label>
            <input className={inputStyle} {...register("email")} type="email" name="email" required />

            <button className={buttonStyle} type="submit">
              Sign Up!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
