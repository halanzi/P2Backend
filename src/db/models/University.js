const { Model } = require("sequelize");

// Slug
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    static associate(models) {
      // define association here
    }
  }
  University.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "University",
    }
  );
  SequelizeSlugify.slugifyModel(University, {
    source: ["name"],
  });
  return University;
};
