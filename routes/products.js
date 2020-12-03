const express = require("express");
const router = express.Router();
const {
  productList,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productController");
const upload = require("../middleware/multer");

//Router Param
router.param("productId", async (req, res, next, productIdVariable) => {
  const product = await fetchProduct(productIdVariable, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = {
      status: 404,
      message: "Product not found.",
    };
    next(err);
  }
});

//Product List
router.get("/", productList);

//Product Delete
router.delete("/:productId", productDelete);

//Product Update
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
