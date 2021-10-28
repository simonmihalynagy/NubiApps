const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: "Business" },
  name: String,
  description: String,
  image: String,
  duration: String,
  cost: String,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
