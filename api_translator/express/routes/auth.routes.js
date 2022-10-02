const express = require("express");
const router = express.Router();

const { check_duplicate_email, create_new_user, check_password } = require('../middlewares/auth.middlewares.js');

const { responseToken, signOut } = require("../controllers/auth.controller.js");

router.post("/signup", check_duplicate_email, create_new_user, responseToken);

router.post("/signin", check_password, responseToken);

router.get("/signout", signOut);

module.exports = router;