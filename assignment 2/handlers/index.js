const { login, logout } = require('./auth');
const { getItems, addItem } = require('./items');
const { createUser, updateUser, deleteUser } = require('./user');

const handlers = {
  get: {
    items: getItems,
  },
  post: {
    login,
    logout,
    user: createUser,
  },
  put: {
    user: updateUser,
    item: addItem,
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
