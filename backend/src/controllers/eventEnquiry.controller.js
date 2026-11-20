const { matchedData } = require('express-validator');
const eventEnquiries = require('../services/eventEnquiry.service');

exports.create = async (req, res) => {
  const { website, ...values } = matchedData(req); // honeypot, never stored
  const enquiry = await eventEnquiries.create(values);
  res.status(201).json({ success: true, message: 'Thank you. We have your enquiry and will be in touch to plan the details.', data: { reference: enquiry.id } });
};
