const Files = require('../enums/Files');
const { insert, update, destroy, findOne } = require('../utils/data');
const { toBase64 } = require('../utils/encode');
const { extractBody } = require('../utils/request');

async function createUser(req) {
  const { name, email, address, password } = await extractBody(req);
  if (!name || !email || !address || !password) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const user = { name, email, address, password, timestamp: Date.now() };
  const newUser = await insert(Files.User, user, toBase64(email));

  return {
    status: 201,
    data: newUser,
  };
}

async function updateUser(req) {
  const { email, name, address } = await extractBody(req);
  if (!email) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      status: 422,
      data: { message: 'invalid user email' },
    };
  }

  const updatedUser = await update(Files.User, toBase64(email), {
    name,
    address,
  });

  return {
    status: 200,
    data: updatedUser,
  };
}

async function deleteUser(req) {
  const { email } = await extractBody(req);
  if (!email) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const success = await destroy(Files.User, toBase64(email));
  if (!success) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  return {
    status: 204,
  };
}

async function getUserById(id) {
  return findOne(Files.User, id);
}

async function getUserByEmail(email) {
  return findOne(Files.User, toBase64(email));
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
};
