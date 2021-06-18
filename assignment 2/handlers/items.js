const Files = require('../enums/Files');
const Items = require('../enums/Items');
const { findOne, insert, update } = require('../utils/data');
const { toBase64 } = require('../utils/encode');
const { extractBody } = require('../utils/request');
const { isLoggedIn, extractSessionToken } = require('../utils/session');

async function getItems(req) {
  if (!(await isLoggedIn(req))) {
    return {
      status: 401,
      data: { message: 'need to be logged in' },
    };
  }

  return {
    status: 200,
    data: Items,
  };
}

async function addItem(req) {
  if (!(await isLoggedIn(req))) {
    return {
      status: 401,
      data: { message: 'need to be logged in' },
    };
  }

  const { code, amount } = await extractBody(req);
  if (!code || !amount || !Items[code]) {
    return {
      status: 422,
      data: { message: 'invalid parameters' },
    };
  }

  const id = toBase64(extractSessionToken(req));
  let cart = await findOne(Files.Cart, id);
  if (!cart) {
    cart = await insert(
      Files.Cart,
      { items: { [code]: amount }, total: amount * Items[code].price },
      id,
    );
  } else {
    cart = await update(Files.Cart, id, {
      items: {
        ...cart.items,
        [code]: amount + (cart[code] || 0),
      },
      total: amount * Items[code].price + cart.total,
    });
  }

  return {
    status: 200,
    data: cart,
  };
}

module.exports = { getItems, addItem };
