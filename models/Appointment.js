const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: Date,
  start: String,
  finish: String,
  cost: String,
  service: { type: String, ref: "Service" },
  client: {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  provider: {
    name: String,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
