const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB...");
  } catch (e) {
    console.log(e);
  }
};

module.exports = dbConnection;