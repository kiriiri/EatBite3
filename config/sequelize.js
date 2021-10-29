const config = require("./config");
const Sequelize = require("sequelize");

const connection = new Sequelize(
    config.sqldbName,
    config.sqlusername,
    config.sqlpassword,
    {
      host: config.sqlhost,
      dialect: "mysql",
      pool: {
        max: 10,
        min: 0,
        acquire: 100000,
        idle: 10000,
      },
      define: {
        timestamps: false,
      },
      logging: false
    }
  );

  module.exports = {
    connection
  }