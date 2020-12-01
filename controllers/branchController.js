const { Branch } = require("../db/models");

//Branch List
exports.branchList = async (req, res, next) => {
  try {
    const branches = await Branch.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
