const Templates = require('../enums/Templates');
const { login, logout } = require('./auth');
const { getItems, addItem, checkout } = require('./items');
const { templateHandler } = require('./template');
const { createUser, updateUser, deleteUser } = require('./user');

const handlers = {
  get: {
    '/': templateHandler(Templates.Home),
    logged: templateHandler(Templates.LoggedHome),
    items: getItems,
  },
  post: {
    login,
    logout,
    checkout,
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
