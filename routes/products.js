const express = require("express");
const router = express.Router();

const {
  productCreate,
  productList,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

/***** Routes *****/
//Product List
router.get("/", productList);

//Product Delete
router.delete("/:productId", productDelete);

//Product Create
router.post("/", productCreate);

//Product Update
router.put("/:productId", productUpdate);

module.exports = router;
