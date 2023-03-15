const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitiesSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  time_start: {
    type: Date,
    required: true,
  },
  time_end: {
    type: Date,
    default: true,
  }
});

const Activities = mongoose.model("activities", activitiesSchema);
module.exports = Activities;
