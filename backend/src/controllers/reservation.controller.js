const { matchedData } = require('express-validator');
const reservations = require('../services/reservation.service');

exports.create = async (req, res) => {
  const { website, ...values } = matchedData(req); // "website" is the honeypot, never stored
  const reservation = await reservations.create(values);
  res.status(201).json({
    success: true,
    message: 'Thank you. Your enquiry is with us. It is not yet a confirmed booking: we will contact you to confirm.',
    data: { reference: reservation.id, date: reservation.date, time: reservation.time, guests: reservation.guests },
  });
};
