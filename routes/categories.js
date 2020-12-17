const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  categoryCreate,
  categoryList,
  productCreate,
  fetchCategory,
} = require("../controllers/categoryController");
const upload = require("../middleware/multer");

//Router Param
router.param("categoryId", async (req, res, next, categoryIdVariable) => {
  const category = await fetchCategory(categoryIdVariable, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = {
      status: 404,
      message: "Category not found.",
    };
    next(err);
  }
});

//Category List
router.get("/", categoryList);

//Category Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  categoryCreate
);

//Product Create
router.post("/:categoryId/products", upload.single("image"), productCreate);
passport.authenticate("jwt", { session: false });

module.exports = router;
