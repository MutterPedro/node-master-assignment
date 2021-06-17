const fs = require('fs');
const { join } = require('path');
const Files = require('../enums/Files');

const location = process.env.DATA_DIR || 'data';

function generateId() {
  return `${Date.now()}-${Math.floor((Math.random() + 1) * 10e10)}`;
}

function buildPath(file, id) {
  return join(location, file, id);
}

function initFolder() {
  Object.values(Files).forEach((file) => {
    if (!fs.existsSync(join(location, file))) {
      fs.mkdirSync(join(location, file), { recursive: true });
    }
  });
}

function insert(file, data, indexBy) {
  const id = generateId();
  const parsedData = JSON.stringify({ ...data, id });

  return new Promise((resolve, reject) => {
    fs.writeFile(buildPath(file, id), parsedData, (err) => {
      if (err) {
        reject(err);

        return;
      }

      if (indexBy) {
        fs.writeFile(buildPath(file, indexBy), parsedData, (err) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(JSON.parse(parsedData));
        });
      } else {
        resolve(JSON.parse(parsedData));
      }
    });
  });
}

function update(file, id, data, indexBy) {
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

        if (indexBy) {
          fs.writeFile(
            buildPath(file, indexBy),
            JSON.stringify(updatedData),
            (err) => {
              if (err) {
                reject(err);

                return;
              }

              resolve(updatedData);
            },
          );
        } else {
          resolve(updatedData);
        }
      });
    });
  });
}

function destroy(file, id, indexBy) {
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

      if (indexBy) {
        fs.unlink(buildPath(file, indexBy), (err) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(true);
        });
      } else {
        resolve(true);
      }
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
