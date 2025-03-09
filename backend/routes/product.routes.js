import express from "express";
import { bestSeller, getProducts, getSingleProduct, newArrivals, similarProducts } from "../controllers/product.controller.js";


const router = express.Router();

//@route GET api/products
//@desc GET all products with optional query filters
// @access Public
router.get("/", getProducts)

//@route GET api/products/best-seller
//@desc Get Best Seller
// @access Public
router.get("/best-seller", bestSeller)

//@route GET api/products/new-arrivals
//@desc Get New Arrivals - latest 8 products - creation date
// @access Public
router.get("/new-arrivals", newArrivals)

//@route GET api/products/:id
//@desc get single Product Detail
// @access Public
router.get("/:id", getSingleProduct)

//@route GET api/products/similar/:id
//@desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", similarProducts)





export default router;