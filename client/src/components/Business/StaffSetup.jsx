import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewEmployee from "./AddNewEmployee";

export default function StaffSetup(props) {
  //const [singleEmployee, setSingleEmployee] = useState({});
  const [employees, setEmployees] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEmployees = () => {
    axios.get(`/business/staff-members/${props.user._id}`).then((response) => {
      setEmployees(response.data.foundStaffMembers);
    });
  };

  useEffect(() => {
    if (!isSubmitting) {
      getEmployees();
    }
    // eslint-disable-next-line
  }, [isSubmitting]);

  // const editClickHandler = (service) => {
  //   setIsEditService((previousState) => !previousState);
  //   setSingleService(service);
  // };

  const deleteClickHandler = (employeeId) => {
    setIsSubmitting(true);
    axios.delete(`/business/delete-employee/${employeeId}`).then((response) => {
      console.log(response.data);
      setIsSubmitting(false);
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="mx-auto flex flex-col items-center w-2/4">
          <h1 className="my-10 text-3xl">Employees</h1>
          {employees.map((employee) => (
            <div key={employee._id}>
              <h3 className="text-red-800">{employee.firstName}</h3>

              <button
                className="rounded border-2 border-black bg-purple-600 text-white"
                onClick={() => deleteClickHandler(employee._id)}
              >
                Remove this employee
              </button>
            </div>
          ))}
        </div>
        <div className="mx-auto flex flex-row justify-center w-2/4">
          <AddNewEmployee setIsSubmitting={setIsSubmitting} user={props.user} />
        </div>
        <button
          className=" mx-auto rounded border-2 border-black bg-purple-600 text-white"
          onClick={props.onBackToMainClick}
        >
          Back to DashBoard
        </button>
      </div>
      <div classname="mx-auto flex justify-center"></div>
    </div>
  );
}
