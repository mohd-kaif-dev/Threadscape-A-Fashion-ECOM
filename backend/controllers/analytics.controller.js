import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const ordersData = await Order.aggregate([
        {
            $group: {
                _id: null, // it groups all documents together,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
    ]);

    const { totalOrders, totalRevenue } = ordersData[0] || { totalOrders: 0, totalRevenue: 0 };

    return {
        users: totalUsers,
        products: totalProducts,
        totalOrders,
        totalRevenue,
    };
};

export const getDailyOrdersData = async (startDate, endDate) => {
    try {
        const dailyOrdersData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    orders: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        // example of dailySalesData
        // [
        // 	{
        // 		_id: "2024-08-18",
        // 		sales: 12,
        // 		revenue: 1450.75
        // 	},
        // ]

        const dateArray = getDatesInRange(startDate, endDate);
        // console.log(dateArray) // ['2024-08-18', '2024-08-19', ... ]

        return dateArray.map((date) => {
            const foundData = dailyOrdersData.find((item) => item._id === date);

            return {
                date,
                orders: foundData?.orders || 0,
                revenue: foundData?.revenue || 0,
            };
        });
    } catch (error) {
        throw error;
    }
};

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
