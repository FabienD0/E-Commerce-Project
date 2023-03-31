"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//gets all data in 'cart' collection
const getCart = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const cart = await db.collection("cart").find().toArray();
    if (cart.length === 0) {
      res.status(200).json({ status: 200, data: [], message: "success" });
    } else if (!cart) {
      res.status(404).json({ status: 404, message: "data not found" });
    } else {
      res.status(200).json({ status: 200, data: cart, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//Adds item to cart, or adds 1 to the quantity of the item (if item exists)
const addToCart = async (req, res) => {
  const {product, quantity} = req.body;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const existingItem = await db.collection("cart").findOne({ _id: product._id });
    if (existingItem) {
      await db
        .collection("cart")
        .updateOne({ _id: product._id }, { $set: { quantity} });
      res.status(200).json({
        status: 200,
        data: { quantity },
        message: "Updated quantity",
      });
    } else  {
      product.quantity = quantity;
      await db.collection("cart").insertOne(product);
      res
        .status(200)
        .json({ status: 200, data: product, message: "added to cart" });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//removes 1 from the quantity or removes the item (if quantity === "1"), based on its id
const removeFromCart = async (req, res) => {
  const id = req.params.itemId;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("eCommerce");

  try {
    const item = await db.collection("cart").findOne({ _id: parseInt(id) });
    if (item.quantity === 1) {
      await db.collection("cart").deleteOne(item);
      res
        .status(200)
        .json({ status: 200, data: item, message: "removed from cart" });
    } else if (parseInt(item.quantity) >= 2) {
      const newQuantity = parseInt(item.quantity) - 1;
      await db
        .collection("cart")
        .updateOne({ _id: item._id }, { $set: { quantity: newQuantity } });
      res.status(200).json({
        status: 200,
        data: { quantity: newQuantity },
        message: "removed from cart",
      });
    } else {
		console.log(`Item not found`, )
      res.status(404).json({ status: 404, message: "item not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//will delete all cart data
const resetCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("eCommerce");
  try {
    await db.collection("cart").deleteMany({});
    res.status(200).json({ status: 200, message: "cart emptied" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, resetCart };
