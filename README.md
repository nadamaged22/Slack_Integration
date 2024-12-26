# Slack Integration with OAuth and Reminders
This project implements a Slack integration using the Slack Web API. It allows the app to authenticate via Slack OAuth, send test messages, and send reminders to a specified Slack channel.

# Features
- Slack OAuth 2.0 authentication.

- Save and load Slack tokens for persistent access.

- Post messages to a Slack channel.

- Send reminder notifications with deadlines to a Slack channel.

# Requirements
- Node.js installed on your system.

- A Slack app created on the Slack API Dashboard.

- The following environment variables set up in a .env file:

- SLACK_CLIENT_ID: Your Slack app's client ID.

- SLACK_CLIENT_SECRET: Your Slack app's client secret.

- SLACK_CHANNEL_ID: The ID of the Slack channel where messages will be sent.

- REDIRECT_URI: The OAuth callback URL (ensure this matches the URL configured in your Slack app).

# API Routes
- GET /auth
- GET /callback 
