const express = require("express");
// const { verify } = require("jsonwebtoken");
const {
  addRecommendation,
  getRecommendedByLocation,
  getRecommendedByPrice,
} = require("../controllers/recommendation.controller");
const { verifyUser } = require("../middleware/verifyAuth");

const router = express.Router();

router.get("/location", verifyUser, getRecommendedByLocation);
router.get("/price", verifyUser, getRecommendedByPrice);
router.post("/add", verifyUser, addRecommendation);

module.exports = router;
