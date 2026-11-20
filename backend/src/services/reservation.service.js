const { Reservation } = require('../models');
const mail = require('./mail.service');
const env = require('../config/env');
const { formatDate, SIGNATURE } = require('../utils/format');

// Save first, then notify. If the email fails, the request is still safe in the database.
exports.create = async (values) => {
  const reservation = await Reservation.create({ ...values, requests: values.requests || null });

  const summary = [
    `Name:      ${reservation.name}`,
    `Guests:    ${reservation.guests}`,
    `When:      ${formatDate(reservation.date)} at ${reservation.time}`,
    `Phone:     ${reservation.phone}`,
    `Email:     ${reservation.email}`,
    `Requests:  ${reservation.requests || '-'}`,
    '',
    `Reference: #${reservation.id}`,
  ].join('\n');

  try {
    if (mail.isConfigured()) {
      // Visitor input only ever goes in the body, never in the subject or headers.
      await mail.send({
        to: env.mail.to,
        subject: `New reservation enquiry #${reservation.id}`,
        text: `A reservation enquiry came in through the website.\n\n${summary}\n\nThis is not yet confirmed. Please contact the guest to confirm.`,
        replyTo: reservation.email,
      });
      await mail.send({
        to: reservation.email,
        subject: 'Your reservation enquiry - Muse Restaurant',
        text: `Dear ${reservation.name},\n\nThank you for your reservation enquiry. Please note that this is not yet a confirmed booking: we will be in touch to confirm, or you are welcome to call us on ${env.mail.phone}.\n\n${summary}\n\n${SIGNATURE}`,
        replyTo: env.mail.to,
      });
      await reservation.update({ notifiedAt: new Date() });
    } else {
      console.warn(`[reservations] #${reservation.id} saved, but no email was sent because SMTP is not configured.`);
    }
  } catch (error) {
    console.error(`[reservations] #${reservation.id} saved, but sending email failed:`, error.message);
  }

  return reservation;
};
