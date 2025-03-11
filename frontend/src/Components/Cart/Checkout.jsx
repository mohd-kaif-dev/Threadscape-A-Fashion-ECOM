import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import StripeButton from "./StripeButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import StripeIntegration from "./StripeIntegration";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setcheckoutId] = useState(false);
  // console.log(cart);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Stripe",
          totalPrice: cart.totalPrice.toFixed(2),
        })
      );
      // console.log(res);
      if (res.payload && res.payload._id) {
        setcheckoutId(res.payload._id); // Set checkout ID if checkout was successful
      }
    }

    // setIsPayPalButtonVisible(true);
  };

  const handlePaymentSuccess = async (details) => {
    try {
      console.log("Before handle payment");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("In the handle Payment");
      await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      console.log("In the finalize checkout, before");
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("In the finalize checkout, after");
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePaymentError = (error) => {
  //   // Handle payment error
  //   console.error("Payment error:", error);
  // };

  // const calculateTotalPrice = () => {
  //   return cart.products.reduce((total, product) => total + product.price, 0);
  // };

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Your Cart is empty</p>;
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-5 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold uppercase mb-4">Checkout</h2>
        <form onSubmit={handleCreateCheckout} className="text-sm">
          <h3 className=" font-semibold mb-3">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user ? user.email : ""}
              disabled
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <h3 className=" font-semibold mb-3">Delivery</h3>
          <div className="mb-3 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-3 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded font-semibold"
              >
                Continue To Payment
              </button>
            ) : (
              <div className="flex flex-col">
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={cart.totalPrice.toFixed(2)}
                  onSuccess={handlePaymentSuccess}
                />

                <StripeButton
                  amount={cart.totalPrice}
                  handleSuccessPayment={handlePaymentSuccess}
                />
                <StripeIntegration
                  handlePaymentSuccess={handlePaymentSuccess}
                  checkoutId={checkoutId}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section  */}
      <div className="bg-gray-200 p-6 rounded-lg">
        <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>
        <div className="border-y border-gray-600 py-4 mb-4 overflow-y-scroll max-h-80">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 bprder-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mr-4 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-md">{product.name}</h3>
                  <p className="text-gray-600 text-xs">Size : {product.size}</p>
                  <p className="text-gray-600 text-xs">
                    Color : {product.color}
                  </p>
                  <p className="text-gray-600 text-xs">
                    $ {product.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>$ {cart.totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Shipping</p>
          <p>
            {" "}
            <span className="line-through text-gray-600">$10</span> Free
          </p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4 border-t pt-4 border-gray-600">
          <p>Total</p>
          <p>$ {cart.totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
