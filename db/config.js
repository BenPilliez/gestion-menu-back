require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_NAME,
    "host": process.env.CLEARDB_DATABASE_URL,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "host": process.env.CLEARDB_DATABASE_URL,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "host": process.env.CLEARDB_DATABASE_URL,
    "dialect": "mysql"
  }
}
