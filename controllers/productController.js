const { Category, Product } = require("../db/models");

// I am not a middleware, i'm a regular function
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

//Product List
exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

//Product Update
exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Product Delete
exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
