import React from "react";
import { Link } from "react-router-dom";

export default function BusinessSetupMain(props) {
  return (
    <div>
      <div className="mx-auto my-auto grid   flex-col justify-center items-center">
        <Link to="/home/business/data">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Edit business data
          </button>
        </Link>
        <Link to="/home/business/services">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Edit services
          </button>
        </Link>
        <Link to="/home/business/staff">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Edit staff
          </button>
        </Link>
        <Link to="/home/business/calendar">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Calendar
          </button>
        </Link>
        <Link to="/home">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
