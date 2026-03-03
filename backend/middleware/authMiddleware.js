const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ================= VERIFY TOKEN =================
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id);

    console.log("USER FOUND:", user);

    if (!user)
      return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.log("VERIFY ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};