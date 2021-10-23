const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: String,
  username: String,
  firstName: String,
  lastName: String,
  phone: String,
  password: String, // hashed
  email: String,
  type: { type: String, enum: ["admin", "employee"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
