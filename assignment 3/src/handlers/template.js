const fs = require('fs');
const path = require('path');

function templateHandler(template) {
  return () => {
    const templatePath = path.resolve(`templates/${template}.html`);

    if (!fs.existsSync(templatePath)) {
      return {
        status: 404,
        contentType: 'text/html',
        data: '<h1>Page not found :(</h1>',
      };
    }

    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          status: 200,
          contentType: 'text/html',
          data: data.toString('utf-8'),
        });
      });
    });
  };
}

function staticHandler() {
  return (req) => {
    const item = req.url.replace(/^\/+|\/+$/g, '');
    const assetPath = path.resolve(item);

    if (!fs.existsSync(assetPath)) {
      return {
        status: 404,
      };
    }

    return new Promise((resolve, reject) => {
      fs.readFile(assetPath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        if (item.includes('html')) {
          resolve({
            status: 200,
            contentType: 'text/html',
            data: data.toString('utf-8'),
          });
        } else if (item.includes('jpg')) {
          resolve({
            status: 200,
            contentType: 'image/jpeg',
            data: data,
          });
        } else if (item.includes('ico')) {
          resolve({
            status: 200,
            contentType: 'image/x-icon',
            data: data,
          });
        } else {
          resolve({
            status: 200,
            contentType: '*/*',
            data: data,
          });
        }
      });
    });
  };
}

module.exports = { templateHandler, staticHandler };
