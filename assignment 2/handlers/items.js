const Files = require('../enums/Files');
const Items = require('../enums/Items');
const { findOne, insert, update, destroy } = require('../utils/data');
const { sendEmail } = require('../utils/email');
const { toBase64 } = require('../utils/encode');
const { charge } = require('../utils/payment');
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

async function checkout(req) {
  const token = await isLoggedIn(req);
  if (!token) {
    return {
      status: 401,
      data: { message: 'need to be logged in' },
    };
  }

  const id = toBase64(extractSessionToken(req));
  const cart = await findOne(Files.Cart, id);
  if (!cart) {
    return {
      status: 422,
      data: { message: 'no items on the cart' },
    };
  }

  const result = await charge(cart.total);
  await sendEmail(
    token.email,
    'Order confirmed!',
    `Congratulations! 
  
  Your order ${Object.keys(cart.items)} is confirmed!
  Total: ${cart.total} USD`,
  );

  await destroy(Files.Cart, id);

  return {
    status: 200,
    data: { payment_id: result.id },
  };
}

module.exports = { getItems, addItem, checkout };
