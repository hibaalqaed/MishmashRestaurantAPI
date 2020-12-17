//IMPORTS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//Routes
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
//Middleware
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const db = require("./db/models");
const path = require("path");

const app = express();

//Middleware
app.use(cors());
//Note: Make sure to call app.use before your routes so that it will be applied to all routes.
app.use(bodyParser.json());
// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({ messagae: "Path Not Found!" });
});

//ERROR HANDLING MIDDLEWARE
// we only pass err in app.js
app.use((err, req, res, next) => {
  // res.status(err.status ? err.status : 500); same as:
  res.status(err.status ?? 500);
  // res.json({ message: err.message ? err.message : "Internal Server Error" }); same as:
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    // FORCE TRUE DELETES THE DB
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
