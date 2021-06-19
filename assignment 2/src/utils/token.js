const { TOKEN_LENGTH } = require('./environment');

const AllowedChars =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateToken() {
  return Array.from(new Array(TOKEN_LENGTH)).reduce(
    (token) => token + AllowedChars[randomNumber(0, AllowedChars.length)],
    '',
  );
}

module.exports = { generateToken };
