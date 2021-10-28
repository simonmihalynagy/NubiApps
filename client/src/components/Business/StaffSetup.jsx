import React from "react";

export default function StaffSetup(props) {
  return (
    <div>
      <h1>we will manage the staff here</h1>
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
