const express = require("express");
const router = express.Router();
const { branchCreate, branchList } = require("../controllers/branchController");
const upload = require("../middleware/multer");

//Branch List
router.get("/", branchList);

//Branch Create
router.post("/", upload.single("image"), branchCreate);

module.exports = router;
