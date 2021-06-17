const fs = require('fs');

const initFolder = () => {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
};

const insert = async (file, data) => {
  const parsedData = typeof data === 'string' ? data : JSON.stringify(data);

  return new Promise((resolve, reject) => {
    fs.appendFile(`data/${file}`, parsedData + ';\n', (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve();
    });
  });
};

module.exports = { insert, initFolder };
