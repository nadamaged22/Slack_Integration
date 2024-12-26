const https = require('https');
const fs = require('fs');
const express = require('express');
const { sslOptions } = require('./sslConfig');
const authRoutes = require('./routes/authRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
require('dotenv').config();

const app = express();

app.use('/', authRoutes);
app.use('/', reminderRoutes);

const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`App listening securely on https://localhost:${PORT}`);
});
