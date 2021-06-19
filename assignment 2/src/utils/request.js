function extractBody(req) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(reject, 5000);

    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      } finally {
        clearTimeout(timeout);
      }
    });
  });
}

module.exports = { extractBody };
