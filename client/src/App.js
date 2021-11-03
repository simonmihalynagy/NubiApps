import React, { useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import BusinessSetup from "./pages/BusinessSetup";
import Booking from "./pages/Booking";

function App(props) {
  //*state to manage currently logged in user*/
  const [currentUser, setCurrentUser] = useState(props.user);

  const loginHandler = (user) => {
    console.log("this is the user object => ", user);
    setCurrentUser(user);
  };

  return (
    <Router>
      <React.Fragment>
        <Navbar user={currentUser} onLogout={loginHandler} />
      </React.Fragment>

      <Route
        exact
        path="/"
        render={() => {
          return currentUser === null ? <Welcome /> : <Redirect to="/home" />;
        }}
      />
      <Route
        exact
        path="/login"
        render={() => {
          console.log(currentUser);
          return !currentUser ? <Login onLogin={loginHandler} /> : <Redirect to="/home" />;
        }}
      />
      <Route
        exact
        path="/signup"
        render={() => {
          return !currentUser ? <Signup onSignup={loginHandler} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return currentUser ? <Home user={currentUser} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/account"
        render={() => {
          return currentUser ? <Account user={currentUser} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/home/edit-account"
        render={() => {
          return currentUser ? (
            <EditAccount onDeleteAccount={loginHandler} user={currentUser} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/home/business"
        render={() => {
          return currentUser && currentUser.type === "admin" ? (
            <BusinessSetup user={currentUser} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route exact path="/booking/:businessId" render={(props) => <Booking {...props} user={currentUser} />} />
    </Router>
  );
}

export default App;
