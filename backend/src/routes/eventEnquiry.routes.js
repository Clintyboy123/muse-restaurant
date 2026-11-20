const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimit');
const controller = require('../controllers/eventEnquiry.controller');
const rules = require('./rules');
const { todayInSA, addDays } = require('../config/hours');

// Keep in step with frontend/src/content/events.js
const EVENT_TYPES = ['Private celebration', 'Baby shower', 'High tea', 'Corporate function', 'Special occasion', 'External catering', 'Something else'];

router.post(
  '/',
  formLimiter,
  validate([
    rules.name(),
    rules.email(),
    rules.phone(),
    body('eventType').isIn(EVENT_TYPES).withMessage('Choose the type of event'),
    body('preferredDate')
      .optional({ values: 'falsy' })
      .isISO8601({ strict: true })
      .withMessage('Choose a valid date')
      .bail()
      .custom((value) => {
        const today = todayInSA();
        if (value < today) throw new Error('Please choose a date from today onwards');
        if (value > addDays(today, 730)) throw new Error('Please choose a date within the next two years');
        return true;
      }),
    body('guests').optional({ values: 'falsy' }).isInt({ min: 1, max: 500 }).withMessage('Enter a number of guests between 1 and 500').toInt(),
    body('requirements').optional({ values: 'falsy' }).trim().isLength({ max: 3000 }).withMessage('Please keep this under 3000 characters'),
    rules.honeypot(),
  ]),
  controller.create
);

module.exports = router;
