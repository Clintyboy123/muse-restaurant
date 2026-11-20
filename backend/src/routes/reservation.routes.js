const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimit');
const controller = require('../controllers/reservation.controller');
const rules = require('./rules');
const { checkSlot, isOpenOn, todayInSA, addDays } = require('../config/hours');

const MAX_DAYS_AHEAD = 180;

router.post(
  '/',
  formLimiter,
  validate([
    rules.name(),
    rules.email(),
    rules.phone(),
    body('guests').isInt({ min: 1, max: 30 }).withMessage('Choose between 1 and 30 guests').toInt(),
    body('date')
      .isISO8601({ strict: true })
      .withMessage('Choose a date')
      .bail()
      .custom((value) => {
        const today = todayInSA();
        if (value < today) throw new Error('Please choose a date from today onwards');
        if (value > addDays(today, MAX_DAYS_AHEAD)) throw new Error('We take reservation enquiries up to six months ahead');
        if (!isOpenOn(value)) throw new Error('We are closed on Sundays and Mondays. Please choose another day.');
        return true;
      }),
    body('time')
      .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
      .withMessage('Choose a time')
      .bail()
      .custom((value, { req }) => {
        const { date } = req.body;
        if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !isOpenOn(date)) return true; // the date rule reports it
        const problem = checkSlot(date, value);
        if (problem) throw new Error(problem);
        return true;
      }),
    body('requests').optional({ values: 'falsy' }).trim().isLength({ max: 1000 }).withMessage('Please keep special requests under 1000 characters'),
    rules.honeypot(),
  ]),
  controller.create
);

module.exports = router;
