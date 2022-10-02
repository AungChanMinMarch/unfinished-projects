const express = require('express');
const router = express.Router();

const authUser = require("../middlewares/authUser.js");
const {isAdmin, isInvitee}= require('../middlewares/novel.middlewares.js')

const {addnovel, getnovels, getnovel, deleteNovel, addEditor, acceptEditor, rejectEditor} = require("../controllers/novel.controller.js")

router.get("/", authUser, getnovels)
router.post("/", authUser, addnovel)
router.get("/:novelId", authUser, getnovel)
router.delete("/:novelId", authUser, deleteNovel)

router.post("/addeditor/:novelId", authUser, isAdmin, addEditor)
router.get("/accepteditor/:inviteId", authUser, isInvitee, acceptEditor)
router.get("/rejecteditor/:inviteId", authUser, isInvitee, rejectEditor)

module.exports = router