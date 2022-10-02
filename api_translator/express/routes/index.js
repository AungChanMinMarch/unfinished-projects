const express = require('express');
const router = express.Router();

const authRoutes =require('./auth.routes.js')
const userRoutes =require('./user.routes.js')
const novelRoutes =require('./novel.routes.js')
const chapterRoutes =require('./chapter.routes.js')
// const inviteRoutes =require('./routes/invite.routes.js')
router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/novel", novelRoutes);
router.use("/chapter", chapterRoutes);

// search users
// get peers
module.exports = router;