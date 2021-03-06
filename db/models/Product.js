const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
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
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 5,
      validate: {
        min: 0.1,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });

  return Product;
};
