import React, { useState } from "react";
import BusinessSetupMain from "../components/Business/BusinessSetupMain";
import ServicesSetup from "../components/Business/ServicesSetup";
import StaffSetup from "../components/Business/StaffSetup";
import EditBusinessData from "../components/Business/BusinessDataSetup";
import ScheduleSetup from "../components/Business/ScheduleSetup";

export default function BusinessSetup(props) {
  //console.log(props.user);
  const [isServices, setIsServices] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isData, setIsData] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [isBusinessMain, setIsBusinessMain] = useState(true);

  const servicesClickHandler = () => {
    setIsServices(true);
    setIsStaff(false);
    setIsData(false);
    setIsBusinessMain(false);
    setIsSchedule(false);
  };

  const staffClickHandler = () => {
    setIsStaff(true);
    setIsServices(false);
    setIsData(false);
    setIsBusinessMain(false);
    setIsSchedule(false);
  };

  const dataClickHandler = () => {
    setIsData(true);
    setIsServices(false);
    setIsStaff(false);
    setIsBusinessMain(false);
    setIsSchedule(false);
  };

  const scheduleClickHandler = () => {
    setIsSchedule(true);
    setIsData(false);
    setIsServices(false);
    setIsStaff(false);
    setIsBusinessMain(false);
  };

  const renderBusinessMain = () => {
    setIsBusinessMain(true);
    setIsSchedule(false);
    setIsData(false);
    setIsServices(false);
    setIsStaff(false);
  };

  return (
    <React.Fragment>
      {isBusinessMain && (
        <BusinessSetupMain
          onDataSetupClick={dataClickHandler}
          onStaffSetupClick={staffClickHandler}
          onServicesSetupClick={servicesClickHandler}
          onScheduleSetupClick={scheduleClickHandler}
        />
      )}
      {isServices && (
        <ServicesSetup
          user={props.user}
          onBackToMainClick={renderBusinessMain}
        />
      )}
      {isStaff && (
        <StaffSetup user={props.user} onBackToMainClick={renderBusinessMain} />
      )}
      {isData && (
        <EditBusinessData
          user={props.user}
          onBackToMainClick={renderBusinessMain}
        />
      )}
      {isSchedule && (
        <ScheduleSetup
          user={props.user}
          onBackToMainClick={renderBusinessMain}
        />
      )}
    </React.Fragment>
  );
}
