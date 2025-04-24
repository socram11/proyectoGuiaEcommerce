const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "user",
      }
    );
    return User;
  }

  static associate(models) {
    User.hasMany(models.Article, { foreignKey: "author", as: "article" });
  }
}

module.exports = User;
