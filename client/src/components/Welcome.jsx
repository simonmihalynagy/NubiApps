import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="px-5">
      <div className="text-4xl pt-20 flex text-center justify-center">
        <h1 className=" my-10 text-6xl">Welcome!</h1>
      </div>
      <img className="" src="carson-masterson-tdrxKGo5zoY-unsplash.jpg" alt="by Carson Masterson" />
      <p className="mt-5 text-4xl text-gray-500 text-center">
        Set up a ligthweight booking-system to manage your appointments!
      </p>
      <div className="flex flex-col items-center pt-20">
        <Link to="/login">
          <button className="px-12 py-5 rounded-lg border-2 bg-purple-600 text-white text-3xl">Log-In!</button>
        </Link>

        <Link to="/signup">
          <button className="px-10 py-5 mt-10 rounded-lg border-2  bg-purple-600 text-white text-3xl">Sign-up!</button>
        </Link>

        {/* <Link to="/booking">
          <button className="px-5 py-5 rounded-lg border-2  bg-purple-600 text-white">Book an appointment!</button>
        </Link> */}
      </div>
    </div>
  );
}
