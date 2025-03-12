import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailyOrdersData, setDailyOrdersData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(
          `
          ${import.meta.env.VITE_BACKEND_URL}/api/admin/analytics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        console.log(response.data);
        setAnalyticsData(response.data.analyticsData);
        setDailyOrdersData(response.data.dailyOrdersData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-zinc-500 to-teal-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-zinc-500 to-green-700"
        />
        <AnalyticsCard
          title="Total Orders"
          value={analyticsData.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          color="from-zinc-500 to-cyan-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-zinc-500 to-lime-700"
        />
      </div>
      <motion.div
        className="bg-zinc-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailyOrdersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-zinc-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
        <Link
          to={
            (title === "Total Orders" && "/admin/orders") ||
            (title === "Total Products" && "/admin/products")
          }
          className="text-zinc-100 hover:underline cursor-pointer text-sm font-semibold"
        >
          {(title === "Total Orders" && "Manage Orders") ||
            (title === "Total Products" && "Manage Products")}
        </Link>
      </div>
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-zinc-600 to-zinc-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-zinc-600 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
