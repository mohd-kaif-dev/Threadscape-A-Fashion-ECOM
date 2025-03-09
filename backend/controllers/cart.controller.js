import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId })
    }
    return null;
}

export const addProduct = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not Found" });

        //Determin if the user is Logged in or guest
        let cart = await getCart(userId, guestId)
        console.log(cart)

        //If the cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex((product) =>
                product.productId.toString() === productId &&
                product.size === size &&
                product.color === color
            );

            if (productIndex > -1) {
                // If the product already exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }
            // Recalculate the Total price
            cart.totalPrice = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);
            // reduce((acc, item) => acc + item, 0)
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user  
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    }
                ],
                totalPrice: product.price * quantity
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error in addProduct Controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { productId, quantity, size, color, guestId, userId } = req.body;

        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not Found" });

        const productIndex = cart.products.findIndex((product) =>
            product.productId.toString() === productId &&
            product.size === size &&
            product.color === color
        );

        if (productIndex > -1) {
            // If the product already exists, update the quantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1); // Remove the product if quantity is 0
            }

            // Recalculate the Total price
            cart.totalPrice = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);
            // reduce((acc, item) => acc + item, 0)
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }



    } catch (error) {
        console.error("Error in updateProduct Controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const { productId, size, color, guestId, userId } = req.body;

        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not Found" });

        const productIndex = cart.products.findIndex((product) =>
            product.productId.toString() === productId &&
            product.size === size &&
            product.color === color
        );

        if (productIndex > -1) {
            // If the product already exists, remove the product
            cart.products.splice(productIndex, 1);

            // Recalculate the Total price
            cart.totalPrice = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);
            // reduce((acc, item) => acc + item, 0)
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }

    } catch (error) {
        console.error("Error in deleteProduct controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getProducts = async (req, res) => {
    try {
        const { guestId, userId } = req.query;
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not Found" });
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getProducts controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const mergeCarts = async (req, res) => {
    try {
        const { guestId } = req.body;
        console.log(guestId)
        console.log(req.user._id)
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });
        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }
            if (userCart) {
                //Merge guest cart with user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((userItem) =>
                        userItem.productId.toString() === guestItem.productId.toString() &&
                        userItem.size === guestItem.size &&
                        userItem.color === guestItem.color
                    );
                    if (productIndex > -1) {
                        // If the product already exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // otherwise add the guest item to the user cart
                        userCart.products.push(guestItem);
                    }
                });
                // Recalculate the Total price
                userCart.totalPrice = userCart.products.reduce((total, product) => total + product.price * product.quantity, 0);
                // reduce((acc, item) => acc + item, 0)
                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error("Error in removing guest cart : ", error);
                }

                res.status(200).json(userCart);
            } else {
                // If the user has no existing cart, assign the guest cart to the user
                guestCart.user = req.user._id;
                guestCart.guestId = null;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                // Guest cart has already been merged with the user cart
                return res.status(200).json(userCart);
            }
            return res.status(404).json({ message: "Guest cart not found" });
        }

    } catch (error) {
        console.error("Error in mergeCarts controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}