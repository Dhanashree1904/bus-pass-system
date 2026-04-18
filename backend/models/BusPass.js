const mongoose = require("mongoose");
const QRCode = require("qrcode");

const busPassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  passType: {
    type: String,
    enum: ["daily", "weekly", "monthly", "quarterly", "annual"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  qrCode: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },
  tripsUsed: {
    type: Number,
    default: 0,
  },
  maxTrips: {
    type: Number,
    default: null,
  },
  routes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate QR Code before saving
busPassSchema.pre("save", async function (next) {
  if (!this.qrCode) {
    try {
      const qrData = {
        passId: this._id,
        userId: this.user,
        validUntil: this.validUntil,
      };
      this.qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("BusPass", busPassSchema);
