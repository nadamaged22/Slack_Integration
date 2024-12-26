const express = require('express');
const { handleAuth, handleOAuthCallback } = require('../services/slackService');
const router = express.Router();

router.get('/auth', handleAuth);

router.get('/oauth/callback', handleOAuthCallback);

module.exports = router;
