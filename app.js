//IMPORTS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");

const app = express();

//Middleware
app.use(cors());
//Note: Make sure to call app.use before your routes so that it will be applied to all routes.
app.use(bodyParser.json());
app.use("/products", productRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
