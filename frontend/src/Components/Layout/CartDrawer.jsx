import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ isDrawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const userId = user ? user._id : null;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }

    toggleDrawer();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full md:w-[20rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        isDrawerOpen ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-3">
        <button onClick={toggleDrawer}>
          <IoMdClose className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {/* Cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* Components for the Cart */}
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {/* Checkout button fixed at the bottom */}
      <div className="p-2 pb-1 sticky bottom-0 bg-white">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="text-xs text-center tracking-tighter mt-2 text-gray-500 font-semibold ">
              Shipping, taxes and discount codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
