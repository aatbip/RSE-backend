const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.json("You are not authorized to enter!");
  }
  const token = authHeader.split(" ")[1];
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload); 
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

module.exports = {
  verifyUser,
};
