const express = require('express')
const {getNovels, createNovel} = require('../controllers/novels.js')

const router = express.Router();

router.get('/', getNovels)
router.post('/', createNovel)

module.exports = router