const http = require('http');
const url = require('url');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const route = router[trimmedPath] || handlers.notFound;

    return route().then(({ status, data }) => {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(status);
      res.end(JSON.stringify(data));
    });
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server started and listening at ${PORT}`);
  });

  const handlers = {};

  handlers.hello = () => {
    return Promise.resolve({
      status: 200,
      data: {
        greet: 'Hello World!',
      },
    });
  };

  handlers.notFound = () => {
    return Promise.resolve({
      status: 404,
    });
  };

  const router = {
    hello: handlers.hello,
  };
}
