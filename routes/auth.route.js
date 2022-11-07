const express = require("express");
// const { verify } = require("jsonwebtoken");
const { registration, signIn } = require("../controllers/auth");
const { verifyAdmin } = require("../middleware/verifyAuth");

const router = express.Router();

router.post("/registration", registration);
router.post("/signin", signIn);
router.post("/admin/signin", verifyAdmin, signIn);

module.exports = router;
