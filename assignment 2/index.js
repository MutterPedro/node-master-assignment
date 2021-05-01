const { createLocalServer } = require('./server');
const { handlers } = require('./handlers');

const server = createLocalServer(handlers);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started and listening at ${PORT}`);
});
