const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User" },

  date: String,
  start: String,
  duration: { type: String, default: "60" },
  cost: String,
  service: { type: Schema.Types.ObjectId, ref: "Service" },
  client: {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
