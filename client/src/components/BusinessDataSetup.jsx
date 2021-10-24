import React from "react";

export default function BusinessDataSetup(props) {
  return (
    <div>
      <h1>here we will manage the business data</h1>
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
