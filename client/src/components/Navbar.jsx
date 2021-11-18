import React from "react";
import Logout from "./Authentication/Logout";

export default function Navbar(props) {
  return (
    <div className="h-20  flex items-center  justify-between bg-purple-700 text-white">
      <span className="text-white font-medium text-3xl">Book-it.</span>
      {/* {modalIsVisible ? <ModalAbout show={displayAboutModal} /> : undefined} */}
      {/* <button className="text-5xl p-10" onClick={displayAboutModal}>
        About
      </button> */}
      {/* <h4 className="text-5xl pr-10">Search Businesses</h4> */}
      {props.user && <Logout onLogout={props.onLogout} />}
    </div>
  );
}
