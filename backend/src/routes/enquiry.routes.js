const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimit');
const controller = require('../controllers/enquiry.controller');
const rules = require('./rules');

// Keep in step with frontend/src/content/site.js (enquirySubjects)
const SUBJECTS = ['General enquiry', 'Menu & dietary question', 'Feedback', 'Press & media', 'Something else'];

router.post(
  '/',
  formLimiter,
  validate([
    rules.name(),
    rules.email(),
    rules.optionalPhone(),
    body('subject').isIn(SUBJECTS).withMessage('Choose what your message is about'),
    body('message').trim().isLength({ min: 10, max: 3000 }).withMessage('Please write a message (at least 10 characters)'),
    rules.honeypot(),
  ]),
  controller.create
);

module.exports = router;
