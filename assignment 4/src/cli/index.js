const readline = require('readline');

const help = require('./help');
const menu = require('./menu');
const { orderDetail, listDayOrders } = require('./orders');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '$ ',
});

function finish() {
  interface.close();
  process.exit(0);
}

function init() {
  interface.on('line', async (str) => {
    await processCommand(str);
    interface.prompt();
  });

  process.on('SIGINT', finish);
  process.on('SIGTERM', finish);
  process.on('beforeExit', finish);

  console.log('CLI started and waiting for a command');
  interface.prompt();
}

async function processCommand(raw = '') {
  const commands = {
    help,
    man: help,
    menu,
    'detail order': orderDetail,
    orders: listDayOrders,
  };

  const str = raw.trim().toLowerCase();
  if (!str) {
    return;
  }

  const command =
    commands[Object.keys(commands).find((key) => str.includes(key))];
  if (command) {
    await command(str);
  } else {
    console.error(`command "${str}" not found. Type 'help' for instructions`);
  }
}

module.exports = { init };
