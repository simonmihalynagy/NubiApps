import axios from "axios";
import React from "react";

//FORM UTILS
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { inputStyle } from "./Login";
import { buttonStyle } from "./Login";
import { labelStyle } from "./Login";

const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^[A-Za-z]\w{7,15}$/;

const formSchema = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  username: yup.string().matches(usernameRegex).required(),
  password: yup.string().matches(passwordRegex, "password should be 7-16 characters").required(),
  email: yup.string().email().required(),
});

//TAILWIND

//COMPNENT FUNCTION

export default function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  console.log(errors);

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
            <input {...register("firstName")} name="firstName" className={inputStyle} type="text" required />
            <p>{errors.firstName ? errors.firstName.message : undefined}</p>
            <label className={labelStyle}>Last Name</label>
            <input {...register("lastName")} name="lastName" className={inputStyle} type="text" required />
            <p>{errors.lastName ? errors.lastName.message : undefined}</p>
            <label className={labelStyle}>Choose A Username</label>
            <input {...register("username")} name="username" className={inputStyle} type="text" required />
            <p>{errors.username ? errors.username.message : undefined}</p>
            <label className={labelStyle}>Choose A Password</label>
            <input {...register("password")} name="password" className={inputStyle} type="password" required />
            <p>{errors.password ? errors.password.message : undefined}</p>
            <label className={labelStyle}>E-mail</label>
            <input className={inputStyle} name="email" {...register("email")} type="email" required />
            <p>{errors.email ? errors.email.message : undefined}</p>
            <button className={buttonStyle} type="submit">
              Sign Up!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
