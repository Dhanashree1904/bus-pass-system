const BusPass = require("../models/BusPass");
const User = require("../models/User");

// Get pass pricing based on type
const getPricingByType = (type) => {
  const pricing = {
    daily: 50,
    weekly: 300,
    monthly: 1000,
    quarterly: 2700,
    annual: 10000,
  };
  return pricing[type] || 0;
};

exports.createPass = async (req, res) => {
  try {
    const { passType, routes } = req.body;
    const userId = req.userId;

    const price = getPricingByType(passType);

    let validFrom = new Date();
    let validUntil = new Date();

    // Calculate validity dates
    switch (passType) {
      case "daily":
        validUntil.setDate(validUntil.getDate() + 1);
        break;
      case "weekly":
        validUntil.setDate(validUntil.getDate() + 7);
        break;
      case "monthly":
        validUntil.setMonth(validUntil.getMonth() + 1);
        break;
      case "quarterly":
        validUntil.setMonth(validUntil.getMonth() + 3);
        break;
      case "annual":
        validUntil.setFullYear(validUntil.getFullYear() + 1);
        break;
    }

    const pass = new BusPass({
      user: userId,
      passType,
      price,
      validFrom,
      validUntil,
      routes,
      status: "active",
    });

    await pass.save();

    // Add pass to user
    await User.findByIdAndUpdate(userId, { $push: { passes: pass._id } });

    res.status(201).json({
      success: true,
      message: "Bus pass created successfully",
      pass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPasses = async (req, res) => {
  try {
    const passes = await BusPass.find({ user: req.userId }).populate("routes");

    res.status(200).json({
      success: true,
      passes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPassDetails = async (req, res) => {
  try {
    const pass = await BusPass.findById(req.params.id).populate("routes");

    if (!pass) {
      return res.status(404).json({ message: "Pass not found" });
    }

    res.status(200).json({
      success: true,
      pass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelPass = async (req, res) => {
  try {
    const pass = await BusPass.findById(req.params.id);

    if (!pass) {
      return res.status(404).json({ message: "Pass not found" });
    }

    if (pass.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    pass.status = "cancelled";
    await pass.save();

    res.status(200).json({
      success: true,
      message: "Pass cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
