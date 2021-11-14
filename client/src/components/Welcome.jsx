import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <div className="  text-4xl pt-20 flex text-center justify-center">
        <h1>Welcome to Book-it!</h1>
      </div>
      <div className="flex flex-col items-center pt-20">
        <Link to="/login">
          <button className=" w-20 rounded-lg border-2 bg-purple-600 text-white">Log-In!</button>
        </Link>

        <Link to="/signup">
          <button className=" w-20 mt-10 rounded-lg border-2  bg-purple-600 text-white">Sign-up!</button>
        </Link>

        {/* <Link to="/booking">
          <button className="px-5 py-5 rounded-lg border-2  bg-purple-600 text-white">Book an appointment!</button>
        </Link> */}
      </div>
    </div>
  );
}
