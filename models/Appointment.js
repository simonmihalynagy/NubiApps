const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User" },
  business: { type: Schema.Types.ObjectId, ref: "Business" },
  date: Date,
  start: String,
  duration: String,
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
