const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const validateurMail = require("../middleware/validateurMail");
const validateurMDP = require("../middleware/validateurMDP");

router.post('/signup', validateurMail, validateurMDP, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
