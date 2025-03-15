import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Info */}
          <div className="flex flex-col md:flex-row md:justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order Id : #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-start sm:items-end sm:mt-0">
              <h2> Delivery :</h2>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium ml-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>
          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method : {orderDetails.paymentMethod}</p>
              <p>
                Status :{" "}
                <span
                  className={`${
                    orderDetails.isPaid
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                >
                  {orderDetails.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method : {orderDetails.shippingMethod}</p>
              <p>
                Address :{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>
          {/* Product List */}
          <div className="overflow-x-auto rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Products</h4>
            <table className="min-w-full text-gray-600 mb-4 rounded-lg">
              <thead className="bg-gray-200 rounded-lg text-nowrap ">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b text-center ">
                    <td className="px-4 py-2 flex items-center w-[180px] md:w-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className=" text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2">${item.price}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Back to Orders Links */}
          <Link
            to={user.role === "admin" ? "/admin/orders" : "/my-orders"}
            className="text-blue-600 hover:underline"
          >
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
