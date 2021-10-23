const express = require("express");
const router = express.Router();
const User = require("../models/User");

// *ADD SERVICE */

router.put("/edit/:id", (req, res, next) => {
  const userId = req.params.id;
  const { image, username, firstName, lastName, phone, password, email } =
    req.body;
  User.findByIdAndUpdate(
    userId,
    {
      image: image,
      username: username,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: password,
      email: email,
    },
    { new: true }
  ).then((updatedUser) => {
    res.json({ message: "user data updated", userData: updatedUser });
  });
});
module.exports = router;
