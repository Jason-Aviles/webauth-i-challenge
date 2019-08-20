
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
    tbl.increments();
tbl.string('username',128)
tbl.string('password',128)
  }).createTable('data', tbl =>{
    tbl.increments();
    tbl.string('name',128)
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("data")
    .dropTableIfExists("users")
};
