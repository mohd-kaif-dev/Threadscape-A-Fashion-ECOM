import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [user, navigate, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
      {loading && <p className="animate-pulse">Loading...</p>}
      {error && <p>{error}</p>}
      <div className="mt-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-500">
          <thead className="bg-zinc-200 text-xs uppercase text-zinc-700">
            <tr>
              <th className="px-4 py-4 ">Order ID</th>
              <th className="px-4 py-4 ">Customer Name</th>
              <th className="px-4 py-4 ">Total Price</th>
              <th className="px-4 py-4 ">Status</th>
              <th className="px-4 py-4 ">Actions</th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="hover:bg-zinc-300">
                  <td
                    onClick={() => navigate(`${order._id}`)}
                    className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap"
                  >
                    #{order._id}
                  </td>
                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{order.totalPrice.toFixed(2)}</td>
                  <td>
                    <select
                      name="Status"
                      value={order.status}
                      onChange={(e) => {
                        handleStatusChange(order._id, e.target.value);
                      }}
                      className="p-2 rounded-lg border border-zinc-300 focus:ring-blue-500 focus:border-blue-500 block "
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="py-2 px-4 text-white bg-green-600 hover:bg-green-700 transition-colors rounded"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-zinc-700 text-center py-4">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
