const Files = require('../enums/Files');
const Items = require('../enums/Items');
const { findOne, findAll } = require('../utils/data');

async function orderDetail(str) {
  const id = str.split('detail order')[1].trim();

  const order = await findOne(Files.Order, id);
  if (!order) {
    console.error(`order with id "${id}" not found`);
    return;
  }

  const items = Object.keys(order.items)
    .map(
      (code) =>
        `${order.items[code]} ${Items[code].name} (${code}) - ${
          order.items[code] * Items[code].price
        }$`,
    )
    .join('\n');

  const data = `
Order ${order.id} - Total: ${order.total}$ at ${new Date(
    order.timestamp,
  ).toLocaleString()}
  
Items: 
${items}`;

  console.info(data);
}

async function listDayOrders() {
  const orders = await findAll(Files.Order);

  const data = orders
    .filter((order) => {
      const diff = (Date.now() - order.timestamp) / 1000 / 60 / 60 / 24;

      return diff <= 1;
    })
    .map(
      (order) =>
        `Order ${order.id} - Total: ${order.total}$ at ${new Date(
          order.timestamp,
        ).toLocaleString()}`,
    )
    .join('\n');

  console.info(data);
}

module.exports = { listDayOrders, orderDetail };
