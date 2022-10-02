const express = require('express');
const router = express.Router();

const authUser = require("../middlewares/authUser.js");

const { addEditor, addContributor } = require("../controllers/invite.controller.js")

router.get("/editor", authUser, addEditor)

router.post("/contributor", authUser, addContributor)

module.exports = router