import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// Data
import users from "./data/users.js";
import products from "./data/products.js";
import categories from "./data/categories.js";

// Models
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Categories from "./models/categoriesModel.js";

import connectDb from "./config/db.js";

dotenv.config();

connectDb();

function addPricesToProducts(products) {
  const productsWithPrices = products.map((product) => {
    let prices;
    switch (product.category) {
      case "Hot Coffee":
        prices = {
          small: product.price,
          medium: product.price + 10,
          large: product.price + 20,
        };
        break;
      case "Ice Coffee":
        prices = {
          small: product.price,
          medium: product.price + 15,
          large: product.price + 25,
        };
        break;
      case "Ice Tea":
        prices = {
          small: product.price,
          medium: product.price + 10,
          large: product.price + 20,
        };
        break;
      default:
        prices = {
          small: product.price,
          medium: product.price,
          large: product.price,
        };
    }
    return {
      ...product,
      prices,
    };
  });
  return productsWithPrices;
}

const importData = async () => {
  try {
    await Order.deleteMany();
    await Categories.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = addPricesToProducts(products).map((product) => {
      return { ...product, user: adminUserId };
    });
    const sampleCategories = categories.map((category) => {
      return { ...category, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);
    await Categories.insertMany(sampleCategories);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Categories.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
