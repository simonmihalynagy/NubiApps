import React from "react";

export default function BusinessSetupMain(props) {
  return (
    <div>
      <button
        className="rounded border-2 bg-purple-600 text-white"
        onClick={props.onServicesSetupClick}
      >
        Edit services
      </button>
      <button
        className="rounded border-2 bg-purple-600 text-white"
        onClick={props.onStaffSetupClick}
      >
        Edit staff
      </button>
      <button
        className="rounded border-2 bg-purple-600 text-white"
        onClick={props.onDataSetupClick}
      >
        Edit business data
      </button>

      <button
        className="rounded border-2 bg-purple-600 text-white"
        onClick={props.onScheduleSetupClick}
      >
        Edit your schedule
      </button>
    </div>
  );
}
