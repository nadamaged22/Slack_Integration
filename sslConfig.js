const fs = require('fs');

// SSL Certificate Configuration
const sslOptions = {
  key: fs.readFileSync('server.key'), // Path to your private key
  cert: fs.readFileSync('server.cert'), // Path to your certificate
};

module.exports = { sslOptions };
