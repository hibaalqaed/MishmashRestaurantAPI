const { Category, Product } = require("../db/models");

// I am not a middleware, i'm a regular function
exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

// Category List
exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "slug", "image"],
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Category Create
exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

//Product Create
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.categoryId = req.params.categoryId;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
