const express = require("express");
const router = express.Router();
const {
  createPass,
  getUserPasses,
  getPassDetails,
  cancelPass,
} = require("../controllers/passController");
const { auth } = require("../middleware/auth");

// All pass routes require authentication
router.use(auth);

router.post("/", createPass);
router.get("/", getUserPasses);
router.get("/:id", getPassDetails);
router.put("/:id/cancel", cancelPass);

module.exports = router;
