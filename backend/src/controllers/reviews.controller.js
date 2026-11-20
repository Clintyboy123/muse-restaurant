const reviews = require('../services/reviews.service');

exports.summary = async (req, res) => {
  const data = await reviews.summary();
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ success: true, data });
};
