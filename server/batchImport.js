//Import data.js in mongoDB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const items = require("./data/items.json");
const companies = require("./data/companies.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (dataOne, dataTwo) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("eCommerce");

    const resultCompanies = await db
      .collection("companies")
      .insertMany(dataOne);
    const resultItems = await db.collection("items").insertMany(dataTwo);

    if (resultCompanies.acknowledged && resultItems.acknowledged) {
      console.log("Success");
    } else {
      console.log("Failed");
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

batchImport(companies, items);
