import React from "react";
import Logout from "./Logout";

export default function Navbar(props) {
  return (
    <div className="flex justify-around bg-purple-700 text-white">
      <p>About</p>
      <p>Book-it</p>
      {props.user && <Logout onLogout={props.onLogout} />}
    </div>
  );
}
