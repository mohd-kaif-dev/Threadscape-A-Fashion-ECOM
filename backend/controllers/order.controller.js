import Order from "../models/order.model.js";
export const myOrders = async (req, res) => {
    try {
        // Find all orders for the authenticated user
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in myOrders controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error in getOrderDetails controller : ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}