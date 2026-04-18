const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  driver: {
    name: String,
    phone: String,
    license: String,
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date,
  },
  status: {
    type: String,
    enum: ["active", "maintenance", "inactive"],
    default: "active",
  },
  amenities: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bus", busSchema);
