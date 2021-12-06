import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

//TAILWIND

const inputStyle = "mb-6 shadow-xl rounded-lg focus:outline-purple-500";

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
    <React.Fragment>
      <div className="mb-10 flex flex-col items-center">
        <div>
          <h1 className="text-center pt-10 text-2xl">Please Fill-Out The Form Below, To Register!</h1>
        </div>
        <div className="pt-10">
          <form className=" flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-xl text-gray-600">First Name</label>
            <input {...register("firstName")} className={inputStyle} type="text" required />
            <label className="text-xl text-gray-600">Last Name</label>
            <input {...register("lastName")} className={inputStyle} type="text" required />
            <label className="text-xl text-gray-600">Choose A Username</label>
            <input {...register("username")} className={inputStyle} type="text" required />
            <label className="text-xl text-gray-600">Choose A Password</label>
            <input
              {...register("password")}
              className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
              type="password"
              required
            />

            <label className="text-xl text-gray-600">E-mail</label>
            <input className={inputStyle} {...register("email")} type="email" name="email" required />

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
