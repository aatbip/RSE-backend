const express = require("express");
const { verifyUser } = require("../middleware/verifyAuth");

const {
  addRating,
  getRatingsByProduct,
} = require("../controllers/rating.controller");

const router = express.Router();

router.get("/:id", getRatingsByProduct);
router.post("/add", verifyUser, addRating);

module.exports = router;
