import express from "express";
import { protectRoute, checkAdmin } from "../middlewares/protectRoute.js";
import { getAnalyticsData, getDailyOrdersData } from "../controllers/analytics.controller.js";

const router = express.Router();

//@route GET api/analytics
// @desc Get Analytics
// @access Private/Admin
router.get("/", protectRoute, checkAdmin, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailyOrdersData = await getDailyOrdersData(startDate, endDate);

        res.json({
            analyticsData,
            dailyOrdersData,
        });
    } catch (error) {
        console.log("Error in analytics route", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router