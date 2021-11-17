import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BusinessSetupMain(props) {
  return (
    <div>
      <div className="mx-auto my-auto  flex justify-center items-center">
        <Link to="/home/business/data">
          <button className="hover:bg-purple-200 rounded-lg hover:text-purple-600 transition-all shadow-md mt-5 mr-5  ounded-lg border-2 hover:translate-y-6 bg-purple-600 text-white">
            Edit business data
          </button>
        </Link>
        <Link to="/home/business/services">
          <button className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mr-5 mb-5 rounded-lg border-2 bg-purple-600 text-white">
            Edit services
          </button>
        </Link>
        <Link to="/home/business/staff">
          <button className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mb-5 ml-5 rounded-lg border-2 bg-purple-600 text-white">
            Edit staff
          </button>
        </Link>
        <Link to="/home/business/calendar">
          <button className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 ml-5 rounded-lg border-2 bg-purple-600 text-white">
            Calendar
          </button>
        </Link>
        <Link to="/home">
          <button className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 ml-5 rounded-lg border-2 bg-purple-600 text-white">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
