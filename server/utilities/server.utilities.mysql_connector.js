const mysql = require('mysql'),
  sequelize_config = central_config["sequelize"];

let con = mysql.createConnection({
  host: sequelize_config.host,
  user: sequelize_config.username,
  password: sequelize_config.password,
  database: sequelize_config.database
});

module.exports = con;