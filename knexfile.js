// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'Picker_1',
      username: 'Mehak',
      password: '123'
    },
    migrations: {
      tableName: "migrations",
      directory: "db/migrations"
    },
    seeds: {
      directory: "db/seeds"
    }
  }



};
