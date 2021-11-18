import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditAccount(props) {
  const [accountData, setAccountData] = useState(props.user);

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    console.log(event.target.name);
    console.log(value);
    setAccountData({
      ...accountData,
      [event.target.name]: value,
    });
  };

  const submitHandler = (event) => {
    const userId = props.user._id;
    console.log(userId);
    event.preventDefault();
    axios
      .put(`/home/edit-account/${userId}`, accountData)
      .then((response) => {
        const newUserData = response.data.updatedUser;
        setAccountData(newUserData);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRequestHandler = () => {
    const userId = props.user._id;
    axios.delete(`/home/delete-account/${userId}`).then((response) => {
      const user = null;
      props.onDeleteAccount(user);
      console.log(response.data);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-10 font-medium text-4xl">Hello {props.user.username}!</h1>
      <h5 className="mt-10  text-2xl text-gray-600">You can edit your account data below:</h5>
      <form onSubmit={submitHandler} className="mt-10 flex flex-col items-center">
        <label className="text-xl text-gray-600">First Name</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          name="firstName"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.firstName}
          value={accountData.firstName}
        />
        <label className="text-xl text-gray-600">Last Name</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          name="lastName"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.lastName}
          value={accountData.lastName}
        />
        {/* <label>Phone Number</label>
        <input
          name="phone"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.phone}
          value={accountData.phone}
        /> */}
        <label className="text-xl text-gray-600">Username</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          name="username"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.username}
          value={accountData.username}
        />
        <label className="text-xl text-gray-600">Email</label>
        <input
          className="mb-6 shadow-xl rounded-lg focus:outline-purple-500"
          name="email"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.email}
          value={accountData.email}
        />
        <button
          className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
          type="submit"
        >
          Save Changes
        </button>
      </form>

      <button
        className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2"
        onClick={deleteRequestHandler}
      >
        Delete Account
      </button>

      <Link to="/home">
        <button className="hover:-translate-y-0.5 hover:bg-purple-400 transform py-6 px-6 font-medium rounded-xl text-xl bg-purple-600 text-white mt-5 border-2">
          Go Back
        </button>
      </Link>
    </div>
  );
}
