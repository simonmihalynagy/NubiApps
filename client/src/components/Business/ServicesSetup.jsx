import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewService from "./AddNewService";
import EditService from "./EditService";
import { Link } from "react-router-dom";

export default function ServicesSetup(props) {
  const [singleService, setSingleService] = useState({});
  const [services, setServices] = useState([]);
  const [isEditService, setIsEditService] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getServices = () => {
    axios.get(`/business/get-services/${props.user._id}`).then((response) => {
      setServices(response.data.foundServices);
    });
  };

  useEffect(() => {
    if (!isSubmitting) {
      getServices();
    }
    // eslint-disable-next-line
  }, [isSubmitting]);

  const editClickHandler = (service) => {
    setIsEditService((previousState) => !previousState);
    setSingleService(service);
  };

  const deleteClickHandler = (serviceId) => {
    setIsSubmitting(true);
    axios.delete(`/business/delete-service/${serviceId}`).then((response) => {
      console.log(response.data);
      setIsSubmitting(false);
    });
  };

  return (
    <div>
      <div className="flex justify-evenly items-center">
        <div className="mb-10 flex flex-col text-center justify-start items-center height-full w-2/4">
          <h1 className="mb-20 font-medium text-4xl">Services</h1>
          {services.map((service) => (
            <div key={service._id}>
              <h3 className="text-2xl mb-5">{service.name}</h3>
              <button
                className="mt-5 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-l bg-purple-600 text-white  border-2"
                onClick={() => editClickHandler(service)}
              >
                Edit service
              </button>
              <button
                className="mt-5 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-l bg-purple-600 text-white  border-2"
                onClick={() => deleteClickHandler(service._id)}
              >
                Delete this service
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center w-2/4">
          {isEditService ? (
            <EditService
              setIsSubmitting={setIsSubmitting}
              singleService={singleService}
              onSaveChangesClick={editClickHandler}
            />
          ) : (
            <AddNewService setIsSubmitting={setIsSubmitting} user={props.user} />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/home/business">
          <button
            className="mt-20 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white  border-2"
            onClick={props.onBackToMainClick}
          >
            Back to DashBoard
          </button>
        </Link>
      </div>
    </div>
  );
}
