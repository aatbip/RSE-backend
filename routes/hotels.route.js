const express = require("express");
// const { verify } = require("jsonwebtoken");
const {
  addNewHotel,
  getHotelsOfUser,
  getAllHotels,
  getHotelById,
} = require("../controllers/hotels.controller");
const { uploader } = require("../middleware/uploader");
const { verifyUser } = require("../middleware/verifyAuth");

const router = express.Router();

router.get("/getallhotels", getAllHotels);
router.post("/addhotel", verifyUser, uploader, addNewHotel);
router.get("/getuserhotels", verifyUser, getHotelsOfUser);
router.get("/:id", getHotelById);

module.exports = router;
