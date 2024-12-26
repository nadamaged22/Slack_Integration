const { WebClient } = require('@slack/web-api');
const axios = require('axios');
const querystring = require('querystring');
const { saveToken, loadToken } = require('./tokenService');
require('dotenv').config();

let slackClient = null;
let slackToken = loadToken();
const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const slackChannel = process.env.SLACK_CHANNEL_ID;
const redirectUri = process.env.REDIRECT_URI;

if (slackToken) {
  slackClient = new WebClient(slackToken);
  console.log('Loaded Slack token and initialized Slack client.');
}

const handleAuth = (req, res) => {
  const authUrl = `https://slack.com/oauth/v2/authorize?${querystring.stringify({
    client_id: clientId,
    scope: 'chat:write',
    redirect_uri: redirectUri,
  })}`;
  res.redirect(authUrl);
};

const handleOAuthCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter.');
  }

  try {
    // Exchange code for an access token
    const response = await axios.post(
      'https://slack.com/api/oauth.v2.access',
      querystring.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const data = response.data;

    if (!data.ok) {
      return res.status(400).send(`OAuth Error: ${data.error}`);
    }

    // Save token and initialize Slack client
    slackToken = data.access_token;
    saveToken(data);
    slackClient = new WebClient(slackToken);

    // Send a test message
    await slackClient.chat.postMessage({
        channel: slackChannel,
        text: 'Hello! Slack API connection is successful.',
      });
    res.send('OAuth successful! Slack is connected.');
  } catch (error) {
    console.error('Error during OAuth:', error);
    res.status(500).send('An error occurred during the OAuth process.');
  }
};
console.log('Slack Channel:', slackChannel);
const sendSlackReminder = async (deadline) => {
  if (!slackClient) {
    console.log('Slack client is not initialized. Authenticate the app to proceed.');
    return;
  }

  try {
    const reminderTime = new Date(deadline.date).toLocaleString();
    const message = `Reminder: The deadline for *${deadline.name}* is approaching on *${reminderTime}* (local time).`;
    await slackClient.chat.postMessage({
        channel: slackChannel, 
        text: message,
      })
    console.log(`Reminder sent for: ${deadline.name}`);
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
};

module.exports = { handleAuth, handleOAuthCallback, sendSlackReminder };
