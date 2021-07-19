const assert = require('assert');
const { fibonacci } = require('../app/lib');

module.exports = {
  'it should return 5': () => {
    const result = fibonacci(5);

    assert.strictEqual(result, 5);
  },
  'it should return 21': () => {
    const result = fibonacci(8);

    assert.strictEqual(result, 21);
  },
  'it should return 1': () => {
    assert.strictEqual(fibonacci(1), 1);
    assert.strictEqual(fibonacci(2), 1);
  },
  'it should return 0': () => {
    assert.strictEqual(fibonacci(0), 0);
  },
  'it should fail for example sake': () => {
    fibonacci('test');
  },
};
