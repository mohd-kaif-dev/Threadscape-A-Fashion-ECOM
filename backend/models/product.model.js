import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    collections: {
        type: String,
        required: true,
    },
    material: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Unisex']
    },
    images: [
        {
            imageId: {
                type: String,
            },
            url: {
                type: String,
                required: true,
            },
            altText: {
                type: String,
            },
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
        trim: true,
    },
    metaKeywords: {
        type: String,
        trim: true,
    },
    dimensions: {
        length: Number,
        breadth: Number,
        height: Number,
    },
    weight: {
        type: Number,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;