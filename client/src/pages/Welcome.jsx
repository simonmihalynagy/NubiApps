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
        Set up a lightweight booking-system to manage your appointments!
      </p>
      <div className="flex flex-col items-center pt-20">
        <Link to="/login">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-8 font-medium rounded-xl text-2xl bg-purple-600 text-white mt-5 border-2">
            Log-In!
          </button>
        </Link>

        <Link to="/signup">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-2xl bg-purple-600 text-white mt-5 border-2">
            Sign-up!
          </button>
        </Link>

        {/* <Link to="/booking">
          <button className="px-5 py-5 rounded-lg border-2  bg-purple-600 text-white">Book an appointment!</button>
        </Link> */}
      </div>
    </div>
  );
}
