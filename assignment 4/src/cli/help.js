module.exports = function help() {
  console.info(`
  help                      show this command instructions
  man                       show this command instructions
  menu                      show all menu items
  detail order <order-id>   show details for a given order ID
  detail user <user-email>  show details from a user by its e-mail
  orders                    list all orders placed in the last 24h
  users                     list all users registered in the last 24h
`);
};
