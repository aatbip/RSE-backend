const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.json("You are not authorized to enter!");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.userId,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch (error) {
    console.log(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  const isAdmin = await User.findOne({ username: req.body.username });
  if (isAdmin.role === "user") {
    return res.status(401).json("You're not admin!");
  }
  next(); 
};

module.exports = {
  verifyUser,
  verifyAdmin,
};
