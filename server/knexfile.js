const url = require('url')

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:@localhost/fluxfail'
const dbConfig = url.parse(dbUrl) // eslint-disable-line node/no-deprecated-api
const [dbUser, dbPass] = (dbConfig.auth || '').split(':')
const dbName = dbConfig.path.substr(1)

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: dbConfig.hostname,
      port: dbConfig.port,
      database: dbName,
      user: dbUser,
      pass: dbPass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: dbConfig.hostname,
      port: dbConfig.port,
      database: dbName,
      user: dbUser,
      pass: dbPass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: dbConfig.hostname,
      port: dbConfig.port,
      database: dbName,
      user: dbUser,
      pass: dbPass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
