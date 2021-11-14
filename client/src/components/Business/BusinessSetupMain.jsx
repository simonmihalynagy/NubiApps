import axios from "axios";
import React, { useState, useEffect } from "react";

export default function BusinessSetupMain(props) {
  const [hasBusiness, setHasBusiness] = useState(false);

  const checkIfBusinessExists = () => {
    const adminId = props.userId;
    axios.get(`/business/get-business-data/${adminId}`).then((response) => {
      response.data.foundBusiness.length === 0 ? setHasBusiness(false) : setHasBusiness(true);
    });
  };

  useEffect(() => {
    checkIfBusinessExists();
  }, []);

  return (
    <div>
      <div className="mx-auto my-auto  flex justify-center items-center">
        <div className="flex flex-col items-center">
          <button
            className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 mr-5  ounded-lg border-2 hover:translate-y-6 bg-purple-600 text-white"
            onClick={props.onDataSetupClick}
          >
            Edit business data
          </button>
          <div className="flex flex-col items-center">
            {hasBusiness ? (
              <React.Fragment>
                <button
                  className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mr-5 mb-5 rounded-lg border-2 bg-purple-600 text-white"
                  onClick={props.onServicesSetupClick}
                >
                  Edit services
                </button>
                <button
                  className="hover:bg-purple-200 hover:text-purple-600  transition-all shadow-md mb-5 ml-5 rounded-lg border-2 bg-purple-600 text-white"
                  onClick={props.onStaffSetupClick}
                >
                  Edit staff
                </button>

                <button
                  className="hover:bg-purple-200  hover:text-purple-600 transition-all shadow-md mt-5 ml-5 rounded-lg border-2 bg-purple-600 text-white"
                  onClick={props.onScheduleSetupClick}
                >
                  Calendar
                </button>
              </React.Fragment>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
