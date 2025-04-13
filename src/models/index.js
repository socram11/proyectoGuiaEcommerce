const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  }
);

const User = require("./User");
const Article = require("./Article");

User.initModel(sequelize);
Article.initModel(sequelize);

module.exports = {
  sequelize,
  User,
  Article,
};
