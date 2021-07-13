const Items = require('../enums/Items');

module.exports = function menu() {
  const formatted = Object.keys(Items)
    .map((key) => {
      return `${Items[key].name} -> price: ${Items[key].price}$ code: ${key}`;
    })
    .join('\n');
  console.info(formatted);
};
