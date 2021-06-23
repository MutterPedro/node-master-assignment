const { createLocalServer } = require('./server');
const { handlers } = require('./handlers');
const { initFolder } = require('./utils/data');

const server = createLocalServer(handlers);
initFolder();

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started and listening at ${PORT}`);
});
