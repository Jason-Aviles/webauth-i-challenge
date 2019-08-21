const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
add,findBy
};

function find() {
  return db('users').select('id','username');
}
function findBy(filter) {
  return db('users').where(filter);
}






function add(item) {
  return db("users")
    .insert(item)
    .then(ids => ({ id: ids[0] }));
}

