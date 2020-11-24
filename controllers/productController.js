let products = require("../products");
const slugify = require("slugify");

//Product Create
exports.productCreate = (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  // id, slug are equivalent to id: id, slug: slug
  const newProduct = { id, slug, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
  res.status(201).json(newProduct);
};

//Product List
exports.productList = (req, res) => res.json(products);

//Product Update
exports.productUpdate = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found." });
  }
};

//Product Delete
exports.productDelete = (req, res) => {
  // const productId = req.params.productId; same as:
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((products) => products.id !== +productId);
    // res.status(204);
    // res.end(); same as:
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found." });
  }
};
