const express = require("express");
// const { verify } = require("jsonwebtoken");
const { registration, signIn } = require("../controllers/auth");

const router = express.Router();

router.post("/registration", registration);
router.post("/signin", signIn);

module.exports = router;
