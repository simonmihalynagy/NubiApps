import React from "react";
import axios from "axios";

export default function Logout(props) {
  const logOutClickHandler = () => {
    axios.post("/auth/logout").then((response) => {
      console.log(response.data);
      const user = null;
      props.onLogout(user);
    });
  };
  return (
    <button className="text-3xl mr-5 font-medium" onClick={logOutClickHandler}>
      Log-out
    </button>
  );
}
