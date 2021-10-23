import React from "react";
import axios from "axios";

export default function Logout(props) {
  const logOutClickHandler = () => {
    axios.post("auth/logout").then((response) => {
      const user = null;
      props.onLogout(user);
      console.log(response.data);
    });
  };
  return <button onClick={logOutClickHandler}>Log-out</button>;
}
