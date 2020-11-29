const express = require("express");
const router = express.Router();

const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productController");

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

//Product Create
router.post("/", productCreate);

//Product Update
router.put("/:productId", productUpdate);

module.exports = router;
