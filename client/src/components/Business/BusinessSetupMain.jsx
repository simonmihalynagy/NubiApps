import React, { useState } from "react";

export default function BusinessSetupMain(props) {
  const [showModal, setShowModal] = useState(false);

  const modalTestClickHandler = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button className="rounded border-2 bg-purple-600 text-white" onClick={props.onServicesSetupClick}>
        Edit services
      </button>
      <button className="rounded border-2 bg-purple-600 text-white" onClick={props.onStaffSetupClick}>
        Edit staff
      </button>
      <button className="rounded border-2 bg-purple-600 text-white" onClick={props.onDataSetupClick}>
        Edit business data
      </button>

      <button className="rounded border-2 bg-purple-600 text-white" onClick={props.onScheduleSetupClick}>
        Calendar
      </button>
    </div>
  );
}
