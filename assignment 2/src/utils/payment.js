const https = require('https');
const querystring = require('querystring');

const { STRIPE_TOKEN } = require('./environment');

const STRIPE_URL = 'https://api.stripe.com';
const STRIPE_SOURCE = 'tok_visa';

function charge(amount, currency = 'usd') {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      amount,
      currency,
      source: STRIPE_SOURCE,
    });

    const options = {
      method: 'POST',
      path: '/v1/charges',
      headers: {
        Authorization: `Bearer ${STRIPE_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(STRIPE_URL, options, (res) => {
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

module.exports = { charge };
