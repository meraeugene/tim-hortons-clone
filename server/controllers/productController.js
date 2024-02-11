import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Categories from "../models/categoriesModel.js";
import mongoose from "mongoose";
import cloudinaryUploadImg from "../utils/cloudinary.js";
import { convertURLToID } from "../utils/convertURLToID.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    // Fetch all products from the database
    const products = await Product.find({ ...keyword })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Respond with the list of products
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    // If an unexpected error occurs, respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Fetch products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    let page = 1;

    if (req.query.pageNumber) {
      page = Number(req.query.pageNumber);
    }

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.params.category;

    const count = await Product.countDocuments({ ...keyword, category });

    // Fetch products from the database based on the specified category
    const products = await Product.find({ ...keyword, category })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const productsWithImageIds = products.map((product) => {
      const imageUrl = product.image;
      const imageId = convertURLToID(imageUrl);
      return { ...product.toObject(), imageId };
    });

    res.json({
      products: productsWithImageIds,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    // If an unexpected error occurs, respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Fetch all  categories
// @route GET /api/products/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Categories.find({});

    const categoriesWithImageIds = categories.map((category) => {
      const imageUrl = category.image;
      const imageId = convertURLToID(imageUrl);
      return { ...category.toObject(), imageId };
    });

    // Respond with the list of categories
    res.status(200).json(categoriesWithImageIds);
  } catch (error) {
    // If an unexpected error occurs, respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  // Extracting the 'id' parameter from the request
  const { id } = req.params;

  try {
    // Check if the 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // Respond with a 400 Bad Request status and an error message
      return res.status(400).json({ error: "Invalid id" });
    }

    // Attempt to find the product by its ID
    const product = await Product.findById(id);

    if (product) {
      // Extract image ID from the product image URL
      const imageUrl = product.image;
      const imageId = convertURLToID(imageUrl);

      // Add imageId property to the product object
      product.image = imageId;

      // If the product is found, respond with a 200 OK status and the product data along with image ID
      res.status(200).json(product);
    } else {
      // If the product is not found, respond with a 404 Not Found status and an error message
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    // If an unexpected error occurs, respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      category,
      priceSmall,
      priceMedium,
      priceLarge,
      countInStock,
    } = req.body;

    let imagePath; // Declare imagePath variable to store the URL of the uploaded image

    if (image) {
      // Upload image to cloudinary
      const cloudinaryResponse = await cloudinaryUploadImg(image.path, "image");
      imagePath = cloudinaryResponse.url; // Store the URL of the uploaded image
    }

    const validateInput = (field, errorMessage) => {
      if (!field) {
        res
          .status(400) // Changed status code to 400 for client error
          .json({ message: `Product Creation Failed. ${errorMessage}` });
        return false;
      }
      return true;
    };

    if (
      !validateInput(name, "Please input name.") ||
      !validateInput(priceSmall, "Please input price for small.") ||
      !validateInput(priceMedium, "Please input price for medium.") ||
      !validateInput(priceLarge, "Please input price for large.") ||
      !validateInput(category, "Please select a category.") ||
      !validateInput(countInStock, "Please input count in stock.") ||
      !validateInput(description, "Please input description.") ||
      !validateInput(image, "Please upload an image.")
    ) {
      return;
    }

    const product = new Product({
      name,
      image: imagePath, // Assign the imagePath to the image property
      description,
      category,
      prices: {
        small: priceSmall,
        medium: priceMedium,
        large: priceLarge,
      },
      countInStock,
      user: req.userCredentials.id,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      // Changed status code to 201 for resource creation
      message: "Product successfully created",
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error }); // Changed status code to 500 for server error
  }
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const {
      name,
      description,
      category,
      priceSmall,
      priceMedium,
      priceLarge,
      countInStock,
      image,
    } = req.body;

    let imagePath; // Declare imagePath variable to store the URL of the uploaded image

    if (image) {
      // Upload image to cloudinary
      const cloudinaryResponse = await cloudinaryUploadImg(image.path, "image");
      imagePath = cloudinaryResponse.url; // Store the URL of the uploaded image
    }

    // console.log("image:", image);
    // console.log("new image: ", imagePath);

    product.name = name;
    product.description = description;
    product.category = category;
    product.prices.small = priceSmall;
    product.prices.medium = priceMedium;
    product.prices.large = priceLarge;
    product.countInStock = countInStock;
    product.image = imagePath || image;

    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product  deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating && !comment) {
    res.status(404).json({ message: "Please submit required fields." });
    return;
  }

  if (!rating) {
    res.status(404).json({ message: "Please submit a rating." });
    return;
  }

  if (!comment) {
    res.status(404).json({ message: "Please submit a comment." });
    return;
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.userCredentials._id.toString()
    );

    if (alreadyReviewed) {
      res
        .status(400)
        .json({ message: "Sorry but you can only review a product once." });
      return;
    }

    const review = {
      firstName: req.userCredentials.firstName,
      lastName: req.userCredentials.lastName,
      email: req.userCredentials.email,
      rating: Number(rating),
      image: req.userCredentials.image,
      comment,
      user: req.userCredentials._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce(
      (acc, review) => acc + review.rating,
      0 / product.reviews.length
    );

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(400).json({ message: "Resource not found" });
  }
});

// @desc Get all reviews for all products
// @route GET /api/products/reviews
// @access Private/Admin
const getAllProductReviews = asyncHandler(async (req, res) => {
  try {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          // Adjust the field based on your intended search
          // For example, if you want to search by product name, use: "name"
          "reviews.firstName": {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({
      ...keyword,
      "reviews.0": { $exists: true },
    });

    // Fetch all products with reviews from the database
    const productsWithReviews = await Product.find({
      ...keyword,
      "reviews.0": { $exists: true }, // Check if there is at least one review
    })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const productsWithImageIds = productsWithReviews.map((product) => {
      const imageUrl = product.image;
      const imageId = convertURLToID(imageUrl);
      return { ...product.toObject(), imageId };
    });

    res.status(200).json({
      productsWithImageIds,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Delete a review by ID
// @route DELETE /api/products/reviews/:id
// @access Private/Admin
const deleteReviewById = asyncHandler(async (req, res) => {
  try {
    // Find a product containing the review by its ID
    const product = await Product.findOne({
      "reviews._id": req.params.id, // Match review ID within the reviews array
    });

    if (product) {
      // Find the index of the review within the reviews array
      const index = product.reviews.findIndex(
        (review) => review._id.toString() === req.params.id
      );

      // Check if the review exists
      if (index !== -1) {
        // Remove the review at the found index
        product.reviews.splice(index, 1);

        // Decrease the number of reviews
        product.numReviews = product.reviews.length;

        // Recalculate the average rating
        if (product.reviews.length > 0) {
          const totalRating = product.reviews.reduce(
            (acc, review) => acc + review.rating,
            0
          );
          product.rating = totalRating / product.reviews.length;
        } else {
          product.rating = 0; // No reviews, set rating to 0
        }

        await product.save();
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: error });
  }
});

export {
  getProductById,
  getProducts,
  getProductsByCategory,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllProductReviews,
  deleteReviewById,
};
