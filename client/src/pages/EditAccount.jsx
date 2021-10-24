import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditAccount(props) {
  const [accountData, setAccountData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    //image: "",
    email: "",
    //password
  });

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
      <h1 className="mt-10 text-4xl">hello {props.user.username}</h1>
      <h5 className="mt-10  text-2xl">you can edit your account data below:</h5>
      <form
        onSubmit={submitHandler}
        className="mt-10 flex flex-col items-center"
      >
        <label>First Name</label>
        <input
          name="firstName"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.firstName}
          value={accountData.firstName}
        />
        <label>Last Name</label>
        <input
          name="lastName"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.lastName}
          value={accountData.lastName}
        />
        <label>Phone Number</label>
        <input
          name="phone"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.phone}
          value={accountData.phone}
        />
        <label>Username</label>
        <input
          name="username"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.username}
          value={accountData.username}
        />
        <label>Email</label>
        <input
          name="email"
          onChange={inputChangeHandler}
          type="text"
          placeholder={props.user.email}
          value={accountData.email}
        />
        <button
          className="border-2 rounded bg-purple-600 text-white"
          type="submit"
        >
          Save Changes
        </button>
      </form>

      <button
        className="border-2 rounded bg-purple-600 text-white"
        onClick={deleteRequestHandler}
      >
        Delete My Account
      </button>

      <Link to="/home">
        <button className="border-2 rounded bg-purple-600 text-white">
          Go Back
        </button>
      </Link>
    </div>
  );
}
