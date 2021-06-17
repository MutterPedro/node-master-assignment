const Files = require('../enums/Files');
const { insert, update, destroy, findOne } = require('../utils/data');
const { extractBody } = require('../utils/request');

async function createUser(req) {
  const { name, email, address, password } = await extractBody(req);
  if (!name || !email || !address || !password) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const user = { name, email, address, password };
  const newUser = await insert(Files.User, user, email);

  return {
    status: 201,
    data: newUser,
  };
}

async function updateUser(req) {
  const { id, name, address } = await extractBody(req);
  if (!id) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const user = await getUserById(id);
  if (!user) {
    return {
      status: 422,
      data: { message: 'invalid user ID' },
    };
  }

  const updatedUser = await update(
    Files.User,
    id,
    { name, address },
    user.email,
  );

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

  const user = await getUserById(id);
  if (!user) {
    return {
      status: 422,
      data: { message: 'invalid user ID' },
    };
  }

  await destroy(Files.User, id, user.email);

  return {
    status: 204,
  };
}

async function getUserById(id) {
  return findOne(Files.User, id);
}

async function getUserByEmail(email) {
  return findOne(Files.User, email);
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
};
