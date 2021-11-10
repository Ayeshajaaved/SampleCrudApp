const environment = "development";
const config = require("./knexfile.js")[environment];

module.exports.knexconfig = require("knex")(config);
