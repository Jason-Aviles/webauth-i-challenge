// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3', debug: true, // needed for sqlite
    connection: {
      filename: './database/sprintsProject.db3',
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true,
    // add the following
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = OFF', done); // turn on FK enforcement
      },
    },
  }, 
};
