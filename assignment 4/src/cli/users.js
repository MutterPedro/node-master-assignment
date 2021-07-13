const Files = require('../enums/Files');
const { toBase64 } = require('../utils/encode');
const { findOne, findAll } = require('../utils/data');

async function userDetail(str) {
  const email = str.split('detail user')[1].trim();

  const user = await findOne(Files.User, toBase64(email));
  if (!user) {
    console.error(`order with id "${email}" not found`);
    return;
  }

  const data = `
User ${user.id}
Name: ${user.name}
E-mail: ${user.email}
Address: ${user.address}
Created at: ${new Date(user.timestamp).toLocaleString()}`;

  console.info(data);
}

async function listDayUsers() {
  const users = await findAll(Files.User);

  const data = users
    .filter((user) => {
      const diff = (Date.now() - user.timestamp) / 1000 / 60 / 60 / 24;

      return diff <= 1;
    })
    .map(
      (user) =>
        `User ${user.id} - Name: ${user.name}, created at ${new Date(
          user.timestamp,
        ).toLocaleString()}`,
    )
    .join('\n');

  console.info(data);
}

module.exports = { listDayUsers, userDetail };
