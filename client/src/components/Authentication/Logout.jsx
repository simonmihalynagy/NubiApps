import React from "react";
import axios from "axios";

export default function Logout(props) {
  const logOutClickHandler = () => {
    // /home
    // /
    axios.post("/auth/logout").then((response) => {
      const user = null;
      props.onLogout(user);
      console.log(response.data);
    });
  };
  return (
    <button className="text-3xl mr-5 font-medium" onClick={logOutClickHandler}>
      Log-out
    </button>
  );
}
