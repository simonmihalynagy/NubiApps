const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET USER DATA
// router.get("/account/:id", (req, res, next) => {
//   const userId = req.params.id;
//   User.findById(userId).then((foundUser) => {
//     res.json({ user: foundUser });
//   });
// });

// *EDIT ACCOUNT*/

router.put("/edit-account/:id", (req, res, next) => {
  const userId = req.params.id;
  const { username, firstName, lastName, phone, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      username: username,
      firstName: firstName,
      lastName: lastName,
      phone: phone,

      email: email,
    },
    { new: true }
  ).then((updatedUser) => {
    res.json({ message: "user data updated", updatedUser: updatedUser });
  });
});
module.exports = router;
