import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { getCheckout } from "../redux/slices/checkoutSlice";
import Confetti from "react-confetti";
const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.checkout);

  let checkoutId = localStorage.getItem("checkoutId");

  console.log("checkoutId : ", checkoutId);

  console.log("checkout :", checkout);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7); // Add 7 days to the order date
    return orderDate.toLocaleDateString();
  };

  console.log("In OrderConfirmationPage");
  useEffect(() => {
    if (checkoutId) {
      dispatch(getCheckout(checkoutId));
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
  }, [dispatch, checkoutId]);

  // useEffect(() => {
  //   dispatch(getCheckout());
  // });
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ zIndex: 99 }}
        gravity={0.1}
        numberOfPieces={700}
        recycle={false}
      />
      <h1 className="text-4xl mb-8 font-bold text-center text-emerald-700">
        Thank You for your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-lg font-semibold">
                Order ID : {checkout._id}
              </h2>
              <p className=" text-sm text-gray-600">
                Order Date : {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm font-semibold">
                Estimated Delivery :{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h2 className=" text-lg font-semibold">
              Order Total : ${checkout.totalPrice}
            </h2>
          </div>
          {/* Checkout Items */}
          <h1 className="text-lg font-semibold mb-4">Ordered Items</h1>
          <div className="mb-8 max-h-80  overflow-y-scroll">
            {checkout?.checkoutItems?.map((item, index) => (
              <div key={index} className="flex items-center mb-2 ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4 rounded-lg"
                />
                <div className="flex flex-grow flex-col md:flex-row justify-between p-4 font-semibold">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.color} | {item.size}
                    </p>
                  </div>

                  <div className="flex md:flex-col space-x-2 md:space-x-0">
                    <p className="text-sm text-gray-600">$ {item.price}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2 border-b border-gray-500">
                Payment
              </h4>
              <p className="text-sm text-gray-600">
                Payment Method : {checkout.paymentMethod}
              </p>
              <p className="text-sm text-gray-600">
                Payment Status : {checkout.paymentStatus}
              </p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2 border-b border-gray-500">
                Delivery
              </h4>
              <p className="text-sm text-gray-600">
                {checkout.shippingAddress?.address},{" "}
                {checkout.shippingAddress?.city},{" "}
              </p>
              <p className="text-sm text-gray-600">
                {checkout.shippingAddress?.state},{" "}
                {checkout.shippingAddress?.country}
              </p>
            </div>
          </div>
          <div className=" text-center font-semibold mb-2 border-t border-zinc-800 py-6">
            <Link to="/">
              <button
                onClick={() => localStorage.removeItem("checkoutId")}
                className="bg-emerald-700 text-white px-4 py-2 rounded-md"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
