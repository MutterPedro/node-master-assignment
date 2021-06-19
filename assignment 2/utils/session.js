const Files = require('../enums/Files');
const { findOne } = require('./data');
const { toBase64 } = require('./encode');

function extractSessionToken(req) {
  return (req.headers['authorization'] || '').replace('Bearer ', '');
}

async function isLoggedIn(req) {
  const token = extractSessionToken(req);
  if (!token) {
    return false;
  }

  const savedToken = await findOne(Files.Token, toBase64(token));
  return savedToken;
}

module.exports = { isLoggedIn, extractSessionToken };
