const express = require('express');
const router = express.Router();

const authUser = require("../middlewares/authUser.js");
const {addChapter, getChapter, ask} = require("../controllers/chapter.controller.js")

router.post("/:novelId", authUser, addChapter)
router.get("/:chapterId", authUser, getChapter)

router.post("/ask/:chapterId", authUser, ask)


// router.delete("/:chapterId", authUser)

module.exports = router;