import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <div className="text-4xl pt-20 flex justify-center">
        <h1>Welcome to Book-it!</h1>
      </div>
      <div className="pt-20 flex justify-around">
        <Link to="/login">
          <button className="border-2 rounded bg-purple-600 text-white">
            Log-In!
          </button>
        </Link>

        <Link to="/signup">
          <button className="border-2 rounded bg-purple-600 text-white">
            Sign-up!
          </button>
        </Link>

        <Link to="/booking">
          <button className="border-2 rounded bg-purple-600 text-white">
            Book an appointment!
          </button>
        </Link>
      </div>
    </div>
  );
}
