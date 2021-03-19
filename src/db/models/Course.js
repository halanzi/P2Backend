const { Model } = require("sequelize");

// Slug
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // define association here
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  SequelizeSlugify.slugifyModel(Course, {
    source: ["name"],
  });
  return Course;
};
