const http = require('http');
const url = require('url');

const createLocalServer = (handlers) =>
  http.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const methodRoutes = handlers[method.toLowerCase()];
    const route = methodRoutes
      ? methodRoutes[trimmedPath] || handlers.notFound
      : handlers.methodNotAllowed;

    return route().then(({ status, data }) => {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);
      res.end(JSON.stringify(data));
    });
  });

module.exports = { createLocalServer };
