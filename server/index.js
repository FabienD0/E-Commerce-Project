"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getCart,
  addToCart,
  removeFromCart,
  resetCart,
} = require("./cartHandlers");
const { checkout, getConfirmation } = require("./checkoutHandler");
const {
  getProducts,
  getProduct,
  getProductsByName,
  getBrands,
  getBrand,
  getCategories,
  getItemsByCategory,
} = require("./handlers");

const PORT = process.env.PORT || 8080;

express()
  .use(function (req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Methods",
    //   "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    // );
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("api/products", getProducts)
  .get("/api/product/:id", getProduct)
  .get("/api/products/:name", getProductsByName)
  .get("/api/brands", getBrands)
  .get("/api/brand/:brandId", getBrand)
  .get("api/categories", getCategories)
  .get("/api/categories/:category", getItemsByCategory)
  .get("/api/cart", getCart)
  .get("/api/confirmation/:id", getConfirmation)
  .post("/api/addToCart", addToCart)
  .post("/api/checkout", checkout)
  .patch("/api/removeFromCart/:itemId", removeFromCart)
  .delete("/api/resetCart", resetCart)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
