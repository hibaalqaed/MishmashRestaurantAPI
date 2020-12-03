const express = require("express");
const router = express.Router();
const {
  branchCreate,
  branchList,
  productCreate,
  fetchBranch,
} = require("../controllers/branchController");
const upload = require("../middleware/multer");

//Router Param
router.param("branchId", async (req, res, next, branchIdVariable) => {
  const branch = await fetchBranch(branchIdVariable, next);
  if (branch) {
    req.branch = branch;
    next();
  } else {
    const err = {
      status: 404,
      message: "Branch not found.",
    };
    next(err);
  }
});

//Branch List
router.get("/", branchList);

//Branch Create
router.post("/", upload.single("image"), branchCreate);

//Product Create
router.post("/:branchId/products", upload.single("image"), productCreate);

module.exports = router;
