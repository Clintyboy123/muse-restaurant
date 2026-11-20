const router = require('express').Router();
const controller = require('../controllers/reviews.controller');

router.get('/summary', controller.summary);

module.exports = router;
