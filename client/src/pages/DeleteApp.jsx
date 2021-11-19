import React, { useState } from "react";
import axios from "axios";
import ModalConfirm from "../components/ModalConfirm";

export default function DeleteApp(props) {
  const [isDeleted, setIsDeleted] = useState(false);

  const modalTitle = "Your appointment has been cancelled!";

  const deleteApp = () => {
    const appId = props.match.params.appId;
    axios.delete(`/calendar/delete-appointment/${appId}`).then((response) => {
      console.log(response.data);
      setIsDeleted(true);
    });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {isDeleted ? (
        <ModalConfirm
          title={modalTitle}
          show={() => {
            setIsDeleted(false);
          }}
        />
      ) : undefined}
      <h1 className="text-6xl mt-56">Click here to delete your appointment:</h1>

      <button
        className="mt-20 hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white  border-2"
        onClick={deleteApp}
      >
        Cancel Appointment
      </button>
    </div>
  );
}
