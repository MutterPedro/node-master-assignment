function fibonacci(n) {
  if (Number.isNaN(n)) {
    throw new TypeError('n is not a number');
  }

  if (n < 2) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = { fibonacci };
