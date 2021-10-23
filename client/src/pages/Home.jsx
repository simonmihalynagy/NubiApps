import React from "react";
import { Link } from "react-router-dom";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import Welcome from "../components/Welcome";
// import Account from "../pages/Account";

export default function Home(props) {
  return (
    <div>
      <h1>Hellobello {props.user.name}</h1>
      <div className="buttongrid">
        <Link to="/home/edit-account">
          <button className=" rounded bg-purple-600 text-white  border-2 border-black">
            Edit Account
          </button>
        </Link>
        <Link to="/home/business-setup">
          <button className=" rounded bg-purple-600 text-white  border-2 border-black">
            Business Setup
          </button>
        </Link>
      </div>
    </div>
  );
}
