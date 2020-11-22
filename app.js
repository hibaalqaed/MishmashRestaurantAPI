//IMPORTS
const express = require("express");
const cors = require("cors");
let products = require("./products");

const app = express();

app.use(cors());

// app.get("/", (request, response) => {
//   console.log("HELLO");
//   response.json({ message: "Hello World" });
// });

//Routes
app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:productSlug", (req, res) => {
  // const productId = req.params.productId; same as:
  const { productSlug } = req.params;
  const foundProduct = products.find((product) => product.slug === productSlug);
  if (foundProduct) {
    products = products.filter((products) => products.slug !== productSlug);
    // res.status(204);
    // res.end(); same as:
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found." });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
