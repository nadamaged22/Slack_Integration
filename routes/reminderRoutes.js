const express = require('express');
const { sendSlackReminder } = require('../services/slackService');
const router = express.Router();

const deadlines = [
  { name: 'Immediate Test Reminder', date: new Date().toISOString() },
];

// Trigger reminders for all deadlines
deadlines.forEach((deadline) => {
  sendSlackReminder(deadline);
  console.log(`Reminder scheduled for: ${deadline.name}`);
});

module.exports = router;
