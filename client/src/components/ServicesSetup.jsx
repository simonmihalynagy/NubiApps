import React from "react";

export default function ServicesSetup(props) {
  return (
    <div>
      <h1>Services setup comes in here</h1>
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
