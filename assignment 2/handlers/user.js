const Files = require('../enums/Files');
const { insert, update, destroy } = require('../utils/data');
const { extractBody } = require('../utils/request');

async function createUser(req) {
  const { name, email, address } = await extractBody(req);
  const user = { name, email, address };

  if (!name || !email || !address) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const newUser = await insert(Files.User, user);

  return {
    status: 201,
    data: newUser,
  };
}

async function updateUser(req) {
  const { id, ...data } = await extractBody(req);
  if (!id) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const updatedUser = await update(Files.User, id, data);
  if (!updatedUser) {
    return {
      status: 422,
      data: { message: 'invalid user ID' },
    };
  }

  return {
    status: 200,
    data: updatedUser,
  };
}

async function deleteUser(req) {
  const { id } = await extractBody(req);
  if (!id) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const success = await destroy(Files.User, id);
  if (!success) {
    return {
      status: 422,
      data: { message: 'invalid user ID' },
    };
  }

  return {
    status: 204,
  };
}

async function getUserById(id) {}

module.exports = { createUser, updateUser, deleteUser, getUserById };
