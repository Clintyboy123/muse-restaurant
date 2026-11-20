// Everything here is served under /api.
const router = require('express').Router();

router.use('/health', require('./health.routes'));
router.use('/reservations', require('./reservation.routes'));
router.use('/event-enquiries', require('./eventEnquiry.routes'));
router.use('/enquiries', require('./enquiry.routes'));
router.use('/reviews', require('./reviews.routes'));

module.exports = router;
