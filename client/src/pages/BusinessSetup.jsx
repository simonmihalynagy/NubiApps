import React, { useState } from "react";
import BusinessSetupMain from "../components/BusinessSetupMain";
import ServicesSetup from "../components/ServicesSetup";
import StaffSetup from "../components/StaffSetup";
import BusinessDataSetup from "../components/BusinessDataSetup";
import ScheduleSetup from "../components/ScheduleSetup";

export default function BusinessSetup(props) {
  console.log(props.user);
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
      {isServices && <ServicesSetup onBackToMainClick={renderBusinessMain} />}
      {isStaff && <StaffSetup onBackToMainClick={renderBusinessMain} />}
      {isData && <BusinessDataSetup onBackToMainClick={renderBusinessMain} />}
      {isSchedule && <ScheduleSetup onBackToMainClick={renderBusinessMain} />}
    </React.Fragment>
  );
}
