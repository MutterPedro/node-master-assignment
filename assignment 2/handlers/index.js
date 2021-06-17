const { createUser, updateUser, deleteUser } = require('./user');

const handlers = {
  get: {},
  post: {
    user: createUser,
  },
  put: {
    user: updateUser,
  },
  delete: {
    user: deleteUser,
  },
};

handlers.notFound = () => {
  return Promise.resolve({
    status: 404,
    data: 'Path not found',
  });
};

handlers.methodNotAllowed = () => {
  return Promise.resolve({
    status: 405,
    data: 'Method not allowed',
  });
};

module.exports = { handlers };
