import { response } from "express";
import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;

        let query = {};

        // Filter Logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") }
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: [color] };
        }

        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice) // gte means greater than equal
            if (maxPrice) query.price.$lte = Number(maxPrice) // lte means less than equal
        }

        if (search) {
            const searchWords = search.split(' ');
            query.$and = searchWords.map((word) => ({
                $or: [
                    { name: { $regex: word, $options: "i" } },
                    { description: { $regex: word, $options: "i" } },
                ],
            }));
        }

        // Sort Logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "Popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Fetch products and apply sorting and limit
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);

        res.json(products);

    } catch (error) {
        console.error("Error in getProducts controller : ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const bestSeller = async (req, res) => {

    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });

        if (!bestSeller) return res.status(404).json({ message: "No Best Seller Found" })
        res.json(bestSeller)



    } catch (error) {
        console.error("Error in bestSeller controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const newArrivals = async (req, res) => {
    try {

        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)

        if (!newArrivals) return res.status(404).json({ message: "No New Arrivals Found" });

        res.status(200).json(newArrivals)


    } catch (error) {
        console.error("Error in newArrivals controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id)

        const product = await Product.findById(id)
        // console.log(product)
        if (!product) return res.status(404).json({ message: "Product Not Found" })
        res.status(200).json(product)

    } catch (error) {
        console.error("Error in getSingleProduct controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const similarProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const currentProduct = await Product.findById(id);

        if (!currentProduct) return res.status(404).json({ message: "Product Not Found" });

        const similarProducts = await Product.find({
            _id: { $ne: id }, // Exclude currentProduct Id 
            gender: currentProduct.gender,
            category: currentProduct.category
        }).limit(4)

        if (!similarProducts) return res.status(404).json({ message: "No similar Products Found" });

        res.status(200).json(similarProducts)


    } catch (error) {
        console.error("Error in similarProducts controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}




