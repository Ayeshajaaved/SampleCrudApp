const knexSQL = require("knex")({
  client: "mssql",
  connection: {
    user: "retailo",
    password: "1234",
    server: "DESKTOP-HURBFIL",
    database: "SampleDB",
  },
});

module.exports = { knexSQL };
