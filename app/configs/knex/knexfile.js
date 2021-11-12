const dotenv = require("dotenv");
dotenv.config();

const knexConfig = {
  development: {
    client: "mssql",
    connection: {
      user: process.env.SQL_DB_USER,
      password: process.env.SQL_DB_PASS,
      server: process.env.SQL_DB_HOST,
      database: process.env.SQL_DB,
    },
  },
};

module.exports = knexConfig;
