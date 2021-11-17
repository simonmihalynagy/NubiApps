import React, { useState } from "react";
import Logout from "./Authentication/Logout";
import ModalAbout from "./ModalAbout";

export default function Navbar(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const displayAboutModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <div className="h-40 flex items-center justify-between bg-purple-700 text-white">
      {modalIsVisible ? <ModalAbout show={displayAboutModal} /> : undefined}
      <button className="text-5xl p-10" onClick={displayAboutModal}>
        About
      </button>
      <h4 className="text-5xl pr-10">Search Businesses</h4>
      {props.user && <Logout onLogout={props.onLogout} />}
    </div>
  );
}
