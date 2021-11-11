import React, { useState } from "react";

export default function BusinessSetupMain(props) {
  const [showModal, setShowModal] = useState(false);

  const modalTestClickHandler = () => {
    setShowModal(true);
  };

  return (
    <div className=" absolute z-10 inset-0 flex justify-center items-center">
      <div className="grid grid-cols-2">
        <button
          className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mr-5 mb-5 h-60 w-60 rounded-lg border-2 bg-purple-600 text-white"
          onClick={props.onServicesSetupClick}
        >
          Edit services
        </button>
        <button
          className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mb-5 ml-5 h-60 w-60 rounded-lg border-2 bg-purple-600 text-white"
          onClick={props.onStaffSetupClick}
        >
          Edit staff
        </button>
        <button
          className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 mr-5 h-60 w-60 rounded-lg border-2 hover:translate-y-6 bg-purple-600 text-white"
          onClick={props.onDataSetupClick}
        >
          Edit business data
        </button>

        <button
          className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 ml-5 h-60 w-60 rounded-lg border-2 bg-purple-600 text-white"
          onClick={props.onScheduleSetupClick}
        >
          Calendar
        </button>
      </div>
    </div>
  );
}
