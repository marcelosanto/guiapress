const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "marcelo", "654321", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;
