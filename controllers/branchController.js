const { Branch, Product } = require("../db/models");

// I am not a middleware, i'm a regular function
exports.fetchBranch = async (branchId, next) => {
  try {
    const foundBranch = await Branch.findByPk(branchId);
    return foundBranch;
  } catch (error) {
    next(error);
  }
};

//Branch List
exports.branchList = async (req, res, next) => {
  try {
    const branches = await Branch.findAll({
      attributes: ["id", "name", "slug", "image"],
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });
    res.json(branches);
  } catch (error) {
    next(error);
  }
};

//Branch Create
exports.branchCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newBranch = await Branch.create(req.body);
    res.status(201).json(newBranch);
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
    // from warehouse ? req.body.bakeryId = req.bakery.id; ??
    req.body.branchId = req.params.branchId;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
