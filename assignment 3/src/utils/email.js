const https = require('https');
const querystring = require('querystring');

const { toBase64 } = require('./encode');
const { MAILGUN_SECRET, MAILGUN_DOMAIN } = require('./environment');

const MAILGUN_URL = 'https://api.mailgun.net';
const MAILGUN_FROM = `Mailgun Sandbox <mailgun@${MAILGUN_DOMAIN}>`; // TODO: change domain to env var

function sendEmail(to, subject, text) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      to,
      subject,
      text,
      from: MAILGUN_FROM,
    });

    const options = {
      method: 'POST',
      path: `/v3/${MAILGUN_DOMAIN}/messages`,
      headers: {
        Authorization: `Basic ${toBase64(`api:${MAILGUN_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(MAILGUN_URL, options, (res) => {
      res.setEncoding('utf8');

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = { sendEmail };
