import React from "react";
import { Link } from "react-router-dom";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import Welcome from "../components/Welcome";
// import Account from "../pages/Account";

export default function Home(props) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Welcome {props.user.username} !</h1>
      <div className="flex mt-10 justify-between">
        <Link to="/home/edit-account">
          <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
            Edit Account
          </button>
        </Link>
        {props.user.type === "admin" && (
          <Link to="/home/business">
            <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
              Business Setup
            </button>
          </Link>
        )}
        {props.hasBusiness && (
          <Link to={`/booking/${props.businessId}`}>
            <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
              To Booking Page
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
