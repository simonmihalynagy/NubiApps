const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  phone: String,
  password: String, // hashed
  email: String,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
