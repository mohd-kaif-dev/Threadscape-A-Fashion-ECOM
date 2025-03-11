import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    loading: orderLoading,
    error: orderError,
    totalOrders,
    totalSales,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (productError || orderError)
    return <div>Error: {productError || orderError}</div>;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {productLoading || orderLoading ? (
        <p>Loading...</p>
      ) : productError ? (
        <p className="text-red-500">Error fetching products: {productError}</p>
      ) : orderError ? (
        <p className="text-red-500">Error fetching orders: {orderError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">${parseFloat(totalSales).toFixed(2)}</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl">{products.length}</p>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-zinc-500">
            <thead className="bg-zinc-200 text-xs uppercase text-zinc-700">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
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
