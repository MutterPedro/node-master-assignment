const LENGTH = process.env.TOKEN_LENGTH || 50;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateToken() {
  return Array.from(new Array(LENGTH)).reduce(
    (token) => token + String.fromCharCode(randomNumber(33, 125)),
    '',
  );
}

module.exports = { generateToken };
