const express = require("express");
const app = express();
require("express-async-errors");

require("dotenv").config();
const cors = require("cors");

const router = require("./routes/index");


//server middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

//db connection
const dbConnection = require("./db/db_connect");
dbConnection();

//setting base route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("HOTEL RECOMMENDATION APP BACKEND");
});

app.listen(5000, () => {
  console.log("App is listening at port 5000...");
});
