const express = require('express');
const Router = express.Router();
const { userSignup, userLogin } = require('../controllers/userController')

Router.post('/register', userSignup)

Router.post('/login', userLogin)

module.exports = Router

