import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import AnalyticsTab from "../Components/Admin/AnalyticsTab";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: productLoading, error: productError } = useSelector(
    (state) => state.adminProducts
  );
  const {
    orders,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (productError || orderError)
    return <div>Error: {productError || orderError}</div>;
  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {productLoading || orderLoading ? (
        <p className="animate-pulse">Loading...</p>
      ) : productError ? (
        <p className="text-red-500">Error fetching products: {productError}</p>
      ) : orderError ? (
        <p className="text-red-500">Error fetching orders: {orderError}</p>
      ) : (
        <AnalyticsTab />
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Orders</h2>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-left text-zinc-500">
            <thead className="bg-zinc-200 text-xs uppercase text-zinc-700">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="bg-zinc-100">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => navigate("/admin/orders")}
                    className="cursor-pointer"
                  >
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.user?.name}</td>
                    <td className="px-4 py-2">
                      ${parseFloat(order.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2"></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-zinc-500"
                  >
                    No Recent Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
