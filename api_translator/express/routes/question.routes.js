const express = require("express");
const router = express.Router();

const authUser = require("../middlewares/authUser.js");

router.post("/add", authUser);

module.exports = router;