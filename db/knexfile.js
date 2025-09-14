const path = require('path');

// Base directory təyin edilməsi
const baseDir = path.join(__dirname, '../');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(baseDir, 'db/mazarina.sqlite3')
    },
    migrations: {
      directory: path.join(baseDir, 'db/migrations')
    },
    seeds: {
      directory: path.join(baseDir, 'db/seeds')
    },
    useNullAsDefault: true, // SQLite3 requires this
    pool: {
      afterCreate: (conn, cb) => {
        // Enable foreign key constraints for SQLite3
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(baseDir, 'db/mazarina.sqlite3')
    },
    migrations: {
      directory: path.join(baseDir, 'db/migrations')
    },
    seeds: {
      directory: path.join(baseDir, 'db/seeds')
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  }
};
