import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";

import EditAccount from "./pages/EditAccount";

import Booking from "./pages/Booking";
import BusinessSetupMain from "./components/Business/BusinessSetupMain";
import BusinessDataSetup from "./components/Business/BusinessDataSetup";
import StaffSetup from "./components/Business/StaffSetup";
import MyCalendar from "./components/Business/Calendar";
import ServiceSetup from "./components/Business/ServicesSetup";
import DeleteApp from "./pages/DeleteApp";
function App(props) {
  //*state to manage currently logged in user*/
  const [currentUser, setCurrentUser] = useState(props.user);
  const [businessId, setBusinessId] = useState("");

  const [hasBusiness, setHasBusiness] = useState(false);
  const checkIfBusinessExists = () => {
    if (currentUser && currentUser.type === "admin") {
      const adminId = currentUser._id;
      axios.get(`/business/get-business-data/${adminId}`).then((response) => {
        console.log(response.data);
        if (response.data.foundBusiness.length === 0) {
          setHasBusiness(false);
        } else {
          setHasBusiness(true);
          setBusinessId(response.data.foundBusiness[0]._id);
        }
      });
    } else {
      return;
    }
  };

  const businessSavedHandler = () => {
    if (currentUser) {
      console.log("setting hasbusiness ");
      setHasBusiness(true);
    }
  };

  useEffect(() => {
    checkIfBusinessExists();
    //eslint-disable-next-line
  }, [currentUser]);

  const loginHandler = (user) => {
    if (user === null) {
      console.log("this is the user object => ", user);
      setHasBusiness(false);
      setCurrentUser(user);
    } else setCurrentUser(user);
  };

  return (
    <Router>
      {console.log(currentUser)}
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
          // console.log(currentUser);
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
          return currentUser ? (
            <Home user={currentUser} hasBusiness={hasBusiness} businessId={businessId} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      {/* <Route
        exact
        path="/account"
        render={() => {
          return currentUser ? <Account user={currentUser} /> : <Redirect to="/login" />;
        }}
      /> */}
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
            <BusinessSetupMain user={currentUser} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/home/business/data"
        render={() => {
          return currentUser && currentUser.type === "admin" ? (
            <BusinessDataSetup onBusinessSave={businessSavedHandler} user={currentUser} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/home/business/staff"
        render={() => {
          return hasBusiness ? <StaffSetup user={currentUser} /> : <Redirect to="/home/business/data" />;
        }}
      />
      <Route
        exact
        path="/home/business/calendar"
        render={() => {
          return hasBusiness ? <MyCalendar user={currentUser} /> : <Redirect to="/home/business/data" />;
        }}
      />
      <Route
        exact
        path="/home/business/services"
        render={() => {
          return hasBusiness ? <ServiceSetup user={currentUser} /> : <Redirect to="/home/business/data" />;
        }}
      />

      <Route exact path="/booking/:businessId" render={(props) => <Booking {...props} />} />
      <Route exact path="/cancel-booking/:appId" render={(props) => <DeleteApp {...props} />} />
    </Router>
  );
}

export default App;
