const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusPass",
  },
  seatNumber: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  boardingPoint: String,
  droppingPoint: String,
  status: {
    type: String,
    enum: ["confirmed", "completed", "cancelled"],
    default: "confirmed",
  },
  price: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "refunded"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
