const Files = require('../enums/Files');
const { insert } = require('../utils/data');
const { extractBody } = require('../utils/request');

async function createUser(req) {
  const { name, email, address } = await extractBody(req);
  const user = { name, email, address };

  await insert(Files.User, user);

  return {
    status: 200,
    data: user,
  };
}

module.exports = { createUser };
