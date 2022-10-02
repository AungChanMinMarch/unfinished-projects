const express = require("express");
const router = express.Router();

const { check_duplicate_email, create_new_user, check_password } = require('../middlewares/auth.middlewares.js');

const userController = require('../controllers/user.controller.js')

const { responseToken, signOut } = require("../controllers/auth.controller.js");

const authUser = require("../middlewares/authUser.js");

router.get('/summaryNotis', authUser, userController.summaryNotis)
router.get('/notis', authUser, userController.getNotis)
router.get("/search/:keyword", userController.search)
router.get('/invites', authUser, userController.getInvites)
router.get('/questions', authUser, userController.getQuestions)

router.post("/signup", check_duplicate_email, create_new_user, responseToken);
router.post("/signin", check_password, responseToken);
router.get("/signout", signOut);

module.exports = router;