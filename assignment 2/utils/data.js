const fs = require('fs');

function generateId() {
  return `${Date.now()}-${Math.floor((Math.random() + 1) * 10e10)}`;
}

function buildPath(file, id = '') {
  return `data/${file}-${id}`;
}

function initFolder() {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
}

async function insert(file, data) {
  const id = generateId();
  const parsedData = JSON.stringify({ ...data, id });

  return new Promise((resolve, reject) => {
    fs.appendFile(buildPath(file, id), parsedData, (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(JSON.parse(parsedData));
    });
  });
}

async function update(file, id, data) {
  const path = buildPath(file, id);
  if (!fs.existsSync(path)) {
    return null;
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, raw) => {
      if (err) {
        reject(err);

        return;
      }

      const current = JSON.parse(raw.toString());
      const updatedData = { ...current, ...data };

      fs.writeFile(path, JSON.stringify(updatedData), (err) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(updatedData);
      });
    });
  });
}

module.exports = { insert, initFolder, update };
