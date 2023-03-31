"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { uuid } = require("uuidv4");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//function to validate email|| checks if theres an @ with a string before it, checks for string after @ and for a . after that string then for a string after the .
const validEmail = (email) => {
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }
  //get index for . and @ to make sure . comes after @
  const atIndex = email.indexOf("@");
  const lastDotIndex = email.lastIndexOf(".");
  console.log(atIndex, lastDotIndex);
  if (lastDotIndex < atIndex) {
    return false;
  }
  return true;
};

const validExpiryDate = (expiry) => {
  const month = expiry.slice(0, 2);
  const monthNumber = parseInt(month);

  const year = expiry.slice(2);
  // -1 because theres 11 months with the Date constructor thingy (counting from 0 = january)
  const date = new Date(Number("20" + year), Number(month) - 1);
  if (monthNumber < 1 || monthNumber > 12) {
    return false; // Invalid month
  } else if (date > new Date() /* date is in the future */) {
    return true;
  } else {
    return false;
  }
};

const checkout = async (req, res) => {
  const { fname, lname, email, address, cardNumber, expiry, cart } =
    req.body.formOrder;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("eCommerce");
  const expiryDate = validExpiryDate(expiry);
  if (!expiryDate) {
    client.close();
    res.status(404).json({ status: 404, message: "invalid expiry date" });
  } else if (cardNumber.length !== 15 && cardNumber.length !== 16) {
    client.close();
    res.status(404).json({ status: 404, message: "invalid card number" });
  } else if (!validEmail(email)) {
    client.close();
    res.status(404).json({ status: 404, message: "invalid email" });
  } else {
    try {
      const promises = cart.map(async (element) => {
        const newNumInStock = element.numInStock - element.quantity;
        await db
          .collection("items")
          .updateOne(
            { _id: element._id },
            { $set: { numInStock: newNumInStock } }
          );
      });
      await Promise.all(promises); //wait for all promises to resolve
      const _id = uuid();
      const orderData = {
        _id: _id,
        fname: fname,
        lname: lname,
        email: email,
        address: address,
        cardNumber: cardNumber,
        expiry: expiry,
        order: cart,
      };

      await db.collection("orders").insertOne(orderData);
      res
        .status(200)
        .json({ status: 200, data: orderData, message: "order placed" });
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
    } finally {
      await client.close();
    }
  }
};

const getConfirmation = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("eCommerce");

    const order = await db.collection("orders").findOne({ _id: id });

    if (!order) {
      res.status(404).json({ status: 404, message: "Order not found" });
    } else {
      res.status(200).json({ status: 200, data: order, message: "success" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { checkout, getConfirmation };
