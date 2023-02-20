require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_DB_URL;

const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(mongoURI, () => {
    console.log("Connected To Mongo Successfully");
  });
};

module.exports = connectToMongo;
