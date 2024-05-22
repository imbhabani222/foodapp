const mongoose = require("mongoose");
// process.env.MONGO_URL = "mongodb+srv://imbhabani222:Jaimaabhabani123@cluster0.1dhk7fk.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"
const mongoURL =
  "mongodb+srv://imbhabani222:Jaimaabhabani123@cluster0.1dhk7fk.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to Mongo Successfully!");

    const fetchedData = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_items = fetchedData;

    const fetchedCategories = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();
    global.food_categoty = fetchedCategories;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
module.exports = mongoDBConnect;
