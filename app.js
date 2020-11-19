//IMPORTS
const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();

app.use(cors());

// app.get("/", (request, response) => {
//   console.log("HELLO");
//   response.json({ message: "Hello World" });
// });

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
