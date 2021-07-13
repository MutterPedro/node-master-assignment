module.exports = function help() {
  console.log(`
  help                      show this command instructions
  man                       show this command instructions
  menu                      show all menu items
  detail order <order-id>   show details for a given order ID
  detail user <user-email>  show details from a user by its e-mail
  users                     list users registered in the last 24h
`);
};
