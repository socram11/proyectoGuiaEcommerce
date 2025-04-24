const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
        },
        author: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: "user",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
      },
      {
        sequelize,
        modelName: "article",
      }
    );

    return Article;
  }
}

module.exports = Article;
