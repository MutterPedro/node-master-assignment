const http = require('http');
const url = require('url');
const { staticHandler } = require('./handlers/template');

const createLocalServer = (handlers) =>
  http.createServer(async (req, res) => {
    try {
      const { method } = req;
      const path = req.url;
      const trimmedPath = path.replace(/^\/+|\/+$/g, '') || '/';

      const methodRoutes = handlers[method.toLowerCase()];
      let route = methodRoutes
        ? methodRoutes[trimmedPath] || handlers.notFound
        : handlers.methodNotAllowed;

      if (trimmedPath.includes('public')) {
        route = staticHandler();
      }

      const { status, data, contentType = 'json' } = await route(req);

      if (contentType === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(status);
        res.end(JSON.stringify(data));
      } else {
        res.setHeader('Content-Type', contentType);
        res.writeHead(status);
        res.end(data);
      }
    } catch (error) {
      res.writeHead(500);
      res.end(error.message);
    }
  });

module.exports = { createLocalServer };
