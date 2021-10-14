import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App(props) {
  const [currentUser, setCurrentUser] = useState(props.user);
  const [isLogin, setIsLogin] = useState(null);
  const loginHandler = (userObject) => {
    setCurrentUser(userObject);
    console.log(currentUser);
  };

  const clickHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <React.Fragment>
      {isLogin === null && (
        <div>
          <button>Log-In!</button>
          <button>Sign-Up!</button>
        </div>
      )}
      <Login onLogin={loginHandler}></Login>
      <Signup></Signup>
    </React.Fragment>
  );
}

export default App;
