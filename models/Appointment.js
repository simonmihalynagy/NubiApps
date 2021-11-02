const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  start: { type: Number },
  duration: { type: Number, default: 1 },
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
