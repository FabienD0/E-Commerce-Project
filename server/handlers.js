"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//get a list of all products available
const getProducts = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const products = await db.collection("items").find().toArray();

    if (products.length === 0) {
      res.status(404).json({ status: 404, message: "data not found" });
    } else {
      res.status(200).json({ status: 200, data: products, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//get data of a single product by its ID
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const product = await db.collection("items").findOne({ _id: parseInt(id) });

    if (!product) {
      res.status(404).json({ status: 404, message: "Product not found" });
    } else {
		
		const viewCount =  product.viewCount ? product.viewCount + 1 : 1;
	  	product.viewCount = viewCount;

	    await db.collection("items").updateOne({_id: product._id}, {
			$set: { viewCount }
	  	});

      res.status(200).json({ status: 200, data: product, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//get data of multiples products by their NAME
const getProductsByName = async (req, res) => {
  const { name } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const product = await db
      .collection("items")
      .find({ name: { $regex: name, $options: "i" } })
      .toArray();

    if (product.length === 0) {
      res
        .status(404)
        .json({ status: 404, data: product, message: "Product not found" });
    } else {
      res.status(200).json({ status: 200, data: product, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//get a list of all brands available
const getBrands = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const brands = await db.collection("companies").find().toArray();

    if (brands.length === 0) {
      res.status(404).json({ status: 404, message: "data not found" });
    } else {
      res.status(200).json({ status: 200, data: brands, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//get data of a single brand based on the brand ID along with all products related to the brand
const getBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const brand = await db
      .collection("companies")
      .findOne({ _id: parseInt(brandId) });

    const products = await db
      .collection("items")
      .find({ companyId: parseInt(brandId) })
      .toArray();

    if (!brand) {
      res.status(404).json({ status: 404, message: "Brand not found" });
    } else {
      res
        .status(200)
        .json({ status: 200, data: { brand, products }, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const items = await db.collection("items").find().toArray();

    const categories = [];

    items.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });

    if (categories.length === 0) {
      res.status(404).json({ status: 404, message: "data not found" });
    } else {
      res
        .status(200)
        .json({ status: 200, data: categories, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getItemsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");
    const items = await db
      .collection("items")
      .find({ category: category })
      .toArray();

    if (items.length === 0) {
      res.status(404).json({ status: 404, message: "data not found" });
    } else {
      res.status(200).json({ status: 200, data: items, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByName,
  getBrands,
  getBrand,
  getCategories,
  getItemsByCategory,
};
