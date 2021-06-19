const fs = require('fs');
const { join } = require('path');

const Files = require('../enums/Files');
const { DATA_DIR } = require('./environment');

function generateId() {
  return `${Date.now()}-${Math.floor((Math.random() + 1) * 10e10)}`;
}

function buildPath(file, id) {
  return join(DATA_DIR, file, id);
}

function initFolder() {
  Object.values(Files).forEach((file) => {
    if (!fs.existsSync(join(DATA_DIR, file))) {
      fs.mkdirSync(join(DATA_DIR, file), { recursive: true });
    }
  });
}

function insert(file, data, id = generateId()) {
  const parsedData = JSON.stringify({ ...data, id });

  return new Promise((resolve, reject) => {
    fs.writeFile(buildPath(file, id), parsedData, (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(JSON.parse(parsedData));
    });
  });
}

function update(file, id, data) {
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

function destroy(file, id) {
  const path = buildPath(file, id);
  if (!fs.existsSync(path)) {
    return false;
  }

  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(true);
    });
  });
}

function findOne(file, id) {
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

      resolve(JSON.parse(raw.toString()));
    });
  });
}

module.exports = { insert, initFolder, update, destroy, findOne };
