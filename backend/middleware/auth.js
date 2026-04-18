const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const adminAuth = (req, res, next) => {
  // Verify auth first
  auth(req, res, () => {
    // Then check if admin (you'll need to fetch user from DB)
    next();
  });
};

module.exports = { auth, adminAuth };
