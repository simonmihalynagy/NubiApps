import React, { useState } from "react";

import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Home(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const loginClickHandler = () => {
    setIsLogin(true);
    setIsSignup(false);
  };

  const signupClickHandler = () => {
    setIsSignup(true);
    setIsLogin(false);
  };

  return (
    <React.Fragment>
      {currentUser === null && (
        <div>
          <div className="flex items-center justify-center h-60">
            <h1 className="flex content-center h-30 text-4xl">
              Welcome to Book-it!
            </h1>
          </div>
          <div className="text-2xl w-full h-60 flex justify-center ">
            <button
              onClick={loginClickHandler}
              className="hover:bg-purple-700 hover:text-white w-2/6 h-full rounded-lg border-solid border-black  border-4"
            >
              Log-In!
            </button>

            <button
              onClick={signupClickHandler}
              className="hover:bg-purple-700 hover:text-white w-2/6 h-full rounded-lg border-solid border-black border-4"
            >
              Sign-up!
            </button>
          </div>
        </div>
      )}
      {isLogin && <Login setCurrentUser={setCurrentUser} />}
      {isSignup && <Signup />}
    </React.Fragment>
  );
}
