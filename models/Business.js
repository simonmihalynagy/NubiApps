const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: String,
  email: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  location: String,
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
