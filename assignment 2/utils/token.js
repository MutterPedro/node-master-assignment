const Length = process.env.TOKEN_LENGTH || 50;
const AllowedChars =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateToken() {
  return Array.from(new Array(Length)).reduce(
    (token) => token + AllowedChars[randomNumber(0, AllowedChars.length)],
    '',
  );
}

module.exports = { generateToken };
