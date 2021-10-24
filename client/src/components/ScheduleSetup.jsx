import React from "react";

export default function ScheduleSetup(props) {
  return (
    <div>
      <h1>Schedule setup comes here</h1>
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
