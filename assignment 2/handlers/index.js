const handlers = {
  get: {},
  post: {},
  put: {},
  delete: {},
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
