const { body } = require('express-validator');

// signup 
module.exports.ownerCreateValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Invalid Email'),

  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({ min: 6 }).withMessage('Password Must Be 6 character'),

  body('fullname')
    .notEmpty().withMessage('Full Name required')
    .isLength({ min: 3 }).withMessage('Full name must be 3 Character'),

  body('contact')
    .notEmpty().withMessage('Full Name required')
    .isLength({ max: 10 }).withMessage('contact must correct'),

]




