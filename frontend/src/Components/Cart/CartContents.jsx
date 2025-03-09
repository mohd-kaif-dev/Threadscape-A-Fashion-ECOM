import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../redux/slices/cartSlice";
const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItem({
          productId,
          quantity: newQuantity,
          size,
          color,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        guestId,
        userId,
        productId,
        size,
        color,
      })
    );
  };
  return (
    <div className="w-full h-full p-2">
      {cart?.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex">
            <img
              className="w-12 h-16 object-cover mr-4 rounded"
              src={product.image}
              alt={product.name}
            />

            <div>
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2 ">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xs font-medium bg-zinc-400"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xs font-medium bg-zinc-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">
              ${product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-5 w-5 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
