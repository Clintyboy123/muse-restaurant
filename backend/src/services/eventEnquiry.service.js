const { EventEnquiry } = require('../models');
const mail = require('./mail.service');
const env = require('../config/env');
const { formatDate, SIGNATURE } = require('../utils/format');

// Save first, then notify the restaurant and acknowledge the guest. A mail failure never loses an enquiry.
exports.create = async (values) => {
  const enquiry = await EventEnquiry.create({
    ...values,
    preferredDate: values.preferredDate || null,
    guests: values.guests || null,
    requirements: values.requirements || null,
  });

  const summary = [
    `Name:          ${enquiry.name}`,
    `Event:         ${enquiry.eventType}`,
    `Preferred:     ${enquiry.preferredDate ? formatDate(enquiry.preferredDate) : '-'}`,
    `Guests:        ${enquiry.guests || '-'}`,
    `Phone:         ${enquiry.phone}`,
    `Email:         ${enquiry.email}`,
    '',
    'Requirements:',
    enquiry.requirements || '-',
    '',
    `Reference: #${enquiry.id}`,
  ].join('\n');

  try {
    if (mail.isConfigured()) {
      await mail.send({ to: env.mail.to, subject: `New event enquiry #${enquiry.id}`, text: `An event enquiry came in through the website.\n\n${summary}`, replyTo: enquiry.email });
      await mail.send({
        to: enquiry.email,
        subject: 'Your event enquiry - Muse Restaurant',
        text: `Dear ${enquiry.name},\n\nThank you for thinking of Muse for your occasion. We have your enquiry and will be in touch to talk through the details.\n\n${summary}\n\n${SIGNATURE}`,
        replyTo: env.mail.to,
      });
      await enquiry.update({ notifiedAt: new Date() });
    } else {
      console.warn(`[event-enquiries] #${enquiry.id} saved, but no email was sent because SMTP is not configured.`);
    }
  } catch (error) {
    console.error(`[event-enquiries] #${enquiry.id} saved, but sending email failed:`, error.message);
  }
  return enquiry;
};
