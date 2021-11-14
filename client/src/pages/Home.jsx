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
          <button className=" mr-10 rounded-lg bg-purple-600 text-white  border-2 border-black">Edit Account</button>
        </Link>
        {props.user.type === "admin" && (
          <Link to="/home/business">
            <button className=" rounded-lg bg-purple-600 text-white  border-2 border-black">Business Setup</button>
          </Link>
        )}
      </div>
    </div>
  );
}
