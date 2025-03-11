import User from "../models/user.model.js"
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";


export const getAdminUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).json({ message: "No Admin User found" });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAdminUsers controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // if (!name || !email || !password) return res.status(400).json({ message: "All Fields are required" })

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password, role: role || "customer" });
        await user.save();
        res.status(201).json({ message: "User created Successfully", user });
    } catch (error) {
        console.error("Error in addUsers controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;



        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();
        res.status(200).json({ message: "User updated Successfully", user });
    } catch (error) {
        console.error("Error in updateUsers controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        await user.deleteOne();
        res.status(200).json({ message: "User deleted Successfully" });
    } catch (error) {
        console.error("Error in deleteUser controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) return res.status(404).json({ message: "No products found" });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProducts controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            user: req.user._id // Reference to the admin user who create the product
        });

        const existingProduct = await Product.findOne({ sku: product.sku });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with the same SKU already exists" });
        }

        const createProduct = await product.save();
        res.status(201).json(createProduct);
    } catch (error) {
        console.error("Error in createProduct controller :", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
        } = req.body;

        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.sku = sku || product.sku;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;

            const updatedProduct = await product.save();
            res.status(200).json({ message: "Product Updated Successfully", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error in updateProduct", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (deletedProduct) {
            await deletedProduct.deleteOne();
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }

    } catch (error) {
        console.error("Error in deleteProduct controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({}).populate("user", "name email");
        if (!orders) return res.status(404).json({ message: "No orders found" });

        res.status(200).json(orders);


    } catch (error) {
        console.error("Error in getAllOrders controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status || order.status;

        order.isDelivered = status === "Delivered" ? true : false;
        order.deliveredAt = status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();
        res.status(200).json({ message: "Order updated Successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error in updateOrder controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        await order.deleteOne();
        res.status(200).json({ message: "Order deleted Successfully" });
    } catch (error) {
        console.error("Error in deleteOrder controller : ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}