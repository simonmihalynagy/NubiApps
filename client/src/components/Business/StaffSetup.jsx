import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewEmployee from "./AddNewEmployee";
import { Link } from "react-router-dom";

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
      <div className="main flex justify-evenly">
        <div className="main_inner_1 flex flex-row">
          <div className="main_inner_1_left text-center items-center">
            <h1 className="my-10 font-medium text-4xl ">Current Employees</h1>
            {employees.map((employee) => (
              <div className="mt-10" key={employee._id}>
                <h2 className="font-medium text-2xl">{employee.firstName}</h2>

                <button
                  className="hover:-translate-y-0.5 hover:bg-purple-400 transform px-2 py-2  font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
                  onClick={() => deleteClickHandler(employee._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="main_inner_1_right">
          <AddNewEmployee setIsSubmitting={setIsSubmitting} user={props.user} />
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Link to="/home/business">
          <button
            className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
            onClick={props.onBackToMainClick}
          >
            Back to DashBoard
          </button>
        </Link>
      </div>
    </div>
  );
}
