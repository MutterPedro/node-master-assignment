const http = require('http');
const url = require('url');

const createLocalServer = (handlers) =>
  http.createServer(async (req, res) => {
    try {
      const { method } = req;
      const path = req.url;
      const trimmedPath = path.replace(/^\/+|\/+$/g, '');

      const methodRoutes = handlers[method.toLowerCase()];
      const route = methodRoutes
        ? methodRoutes[trimmedPath] || handlers.notFound
        : handlers.methodNotAllowed;

      const { status, data } = await route(req);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500);
      res.end(error.message);
    }
  });

module.exports = { createLocalServer };
