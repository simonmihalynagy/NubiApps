import React, { useState } from "react";

export default function BusinessDataSetup(props) {
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    location: "",
  });

  return (
    <div>
      <h1>Please fill-out the form below to create your business:</h1>
      <form>
        <label>Name your business:</label>
        <input type="text" name="name" value="" />
        <label>Please enter an email address:</label>
        <input type="text" name="email" value="" />
        <label>Please enter the location on your business</label>
        <input type="text" name="location" value="" />
        <button type="submit">Create business!</button>
      </form>
      <button onClick={props.onBackToMainClick}>Back to DashBoard</button>
    </div>
  );
}
