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
  const {
    username,
    firstName,
    lastName,
    // phone,
    email,
  } = req.body;

  // const salt = bcrypt.genSaltSync(10);
  // const hashPass = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(
    userId,
    {
      //image: image,
      username: username,
      firstName: firstName,
      lastName: lastName,
      // phone: phone,
      //password: hashPass
      email: email,
    },
    { new: true }
  ).then((updatedUser) => {
    res.json({ message: "user data updated", updatedUser: updatedUser });
  });
});

router.delete("/delete-account/:id", (req, res, next) => {
  req.session.destroy();
  const userId = req.params.id;

  User.findByIdAndDelete(userId).then((result) => {
    res.json(result);
  });

  //BUsiness.delete(business_id) ??????
});
module.exports = router;
