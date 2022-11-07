const express = require("express");
const authRouter = require("./auth.route");
const hotelsRouter = require("./hotels.route");
const recommendationRouter = require("./recommendation.route");
const ratingRouter = require("./rating.route");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/hotels", hotelsRouter);
router.use("/recommendation", recommendationRouter);
router.use("/rating", ratingRouter);

module.exports = router;
