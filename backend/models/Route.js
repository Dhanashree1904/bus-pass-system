const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  startPoint: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
    required: true,
  },
  stops: [
    {
      name: String,
      latitude: Number,
      longitude: Number,
      sequence: Number,
    },
  ],
  distance: {
    type: Number,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  buses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
  ],
  schedule: [
    {
      day: String,
      departureTime: String,
      frequency: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Route", routeSchema);
