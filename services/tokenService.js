const fs = require('fs');
const tokenFilePath = './slack_token.json';

const saveToken = (data) => {
  try {
    fs.writeFileSync(tokenFilePath, JSON.stringify(data));
    console.log('Token saved to file.');
  } catch (error) {
    console.error('Error saving token to file:', error);
  }
};

const loadToken = () => {
  if (fs.existsSync(tokenFilePath)) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
      console.log('Token loaded from file.');
      return tokenData.access_token;
    } catch (error) {
      console.error('Error loading token from file:', error);
    }
  }
  return null;
};

module.exports = { saveToken, loadToken };
