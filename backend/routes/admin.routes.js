import express from "express";
import { protectRoute, checkAdmin } from "../middlewares/protectRoute.js"
import { addUser, getAdminUsers, updateUser, deleteUser, getAllProducts, createProduct, deleteProduct, updateProduct, getAllOrders, updateOrder, deleteOrder } from "../controllers/admin.controller.js";
import { getOrderDetails } from "../controllers/order.controller.js";

const router = express.Router();

// --------------------------------------USERS ROUTES---------------------------------------------------------
//@route GET /api/admin/users
// @desc Get all users
// @access Private/Admin
router.get("/users", protectRoute, checkAdmin, getAdminUsers);

// @route POST /api/admin/users
// @desc Create a new User (Admin Only)
// @access Private/Admin
router.post("/users", protectRoute, checkAdmin, addUser);

// @route PUT /api/admin/users/:id
// @desc Update a user (Admin Only)
// @access Private/Admin
router.put("/users/:id", protectRoute, checkAdmin, updateUser)

// @route DELETE /api/admin/users/:id
// @desc Delete a user (Admin Only)
// @access Private/Admin
router.delete("/users/:id", protectRoute, checkAdmin, deleteUser)

//-----------------------------------PRODUCTS ROUTES-------------------------------------------------
// @route GET /api/admin/products
// @desc Get all products (Admin Only)
// @access Private/Admin
router.get("/products", protectRoute, checkAdmin, getAllProducts);
//@route POST /api/products
// @desc Create Product
// @access Private/Admin
router.post("/products", protectRoute, checkAdmin, createProduct)

//@route PUT /api/products/update/:id
// @desc Update Product
// @access Private/Admin
router.put("/products/update/:id", protectRoute, checkAdmin, updateProduct)

//@route DELETE api/products/delete/:id
//@desc Delete Product
// @access Private/Admin
router.delete("/products/delete/:id", protectRoute, checkAdmin, deleteProduct)

//--------------------------------------ORDERS ROUTE-----------------------------------------------------
// @route GET /api/admin/orders
// @desc Get all orders (Admin Only)
// @access Private/Admin
router.get("/orders", protectRoute, checkAdmin, getAllOrders);



// @route PUT /api/admin/orders/:id
// @desc Update an order (Admin Only)
// @access Private/Admin
router.put("/orders/:id", protectRoute, checkAdmin, updateOrder);

// @route DELETE /api/admin/orders/:id
// @desc Delete an order (Admin Only)
// @access Private/Admin
router.delete("/orders/:id", protectRoute, checkAdmin, deleteOrder);
export default router;