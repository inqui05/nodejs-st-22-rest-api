const fs = require("fs");

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME ? process.env.POSTGRES_USERNAME : "postgres",
    password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : "root5",
    database: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "REST-API",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
};
