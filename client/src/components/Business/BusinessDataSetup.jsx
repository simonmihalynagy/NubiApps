import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateBusiness from "./CreateBusiness";
import EditBusinessData from "./EditBusinessData";

export default function BusinessDataSetup(props) {
  const [isCreate, setIsCreate] = useState(true);

  const adminId = props.user._id;
  useEffect(() => {
    axios.get(`/business/get-business-data/${adminId}`).then((response) => {
      if (
        response.data.foundBusiness &&
        response.data.foundBusiness.length !== 0
      ) {
        console.log(
          "this is the response from api call from business data setup",
          response.data.foundBusiness
        );
        setIsCreate(false);
      }
    });
  }, []);

  return (
    <React.Fragment>
      {isCreate ? (
        <CreateBusiness
          onBackToMainClick={props.onBackToMainClick}
          user={props.user}
        />
      ) : (
        <EditBusinessData
          onBackToMainClick={props.onBackToMainClick}
          user={props.user}
        />
      )}
    </React.Fragment>
  );
}
