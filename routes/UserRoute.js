const { loginUser, signupUser } = require("../controller/UserController")

const express = require('express')
const router = express.Router()


router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router