const express = require('express');
const validate = require('../middleware/validate.middleware');
const { signupValidator, loginValidator } = require('../validator/auth.validator');
const { signupController, loginController, logoutController } = require('../controllers/auth.controller')
const authRoutes = express.Router();



// signup routes 
authRoutes.post('/signup', signupValidator, validate, signupController)
authRoutes.post('/login', loginValidator, validate, loginController)
authRoutes.post('/logout', logoutController)






module.exports = authRoutes