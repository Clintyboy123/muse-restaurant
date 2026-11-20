// Validation rules shared by the form routes.
const { body } = require('express-validator');

exports.name = () => body('name').trim().notEmpty().withMessage('Please enter your name').isLength({ max: 120 }).withMessage('That name is too long');
exports.email = () => body('email').trim().isEmail().withMessage('Please enter a valid email address').isLength({ max: 254 });
exports.phone = () =>
  body('phone')
    .trim()
    .matches(/^[+()\d\s-]{9,20}$/)
    .withMessage('Please enter a valid contact number');
exports.optionalPhone = () =>
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[+()\d\s-]{9,20}$/)
    .withMessage('Please enter a valid contact number');
// Honeypot: a hidden field real visitors never fill in.
exports.honeypot = () => body('website').optional().isEmpty().withMessage('Invalid submission');
