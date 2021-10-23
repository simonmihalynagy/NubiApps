import React from "react";

export default function Account(props) {
  return (
    <div>
      <h1>hello {props.user.username}</h1>
    </div>
  );
}
