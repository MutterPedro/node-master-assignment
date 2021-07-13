function toBase64(data) {
  return Buffer.from(data).toString('base64');
}

function fromBase64(string) {
  return Buffer.from(string, 'base64').toString();
}

module.exports = { toBase64, fromBase64 };
