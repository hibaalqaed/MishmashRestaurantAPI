//IMPORTS
const express = require("express");
const cors = require("cors");
let products = require("./products");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

//Note: Make sure to call app.use before your routes so that it will be applied to all routes.
app.use(bodyParser.json());

app.use(cors());

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

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  // id, slug are equivalent to id: id, slug: slug
  const newProduct = { id, slug, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
  res.status(201).json(newProduct);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
