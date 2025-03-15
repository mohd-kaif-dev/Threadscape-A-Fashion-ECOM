import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product Added To Cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p className="text-center animate-pulse">Loading...</p>;
  if (error) return <p className="text-center">Error : {error}</p>;

  return (
    <div className="p-4">
      {selectedProduct && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg mt-14">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                    (!mainImage && index === 0) || mainImage === image.url
                      ? "border-black"
                      : ""
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage || selectedProduct.images[0].url}
                  alt={"Main Product Image"}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* For Mobile Thumbnail */}
            <div className="flex md:hidden space-x-4 mb-4 overflow-x-scroll">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                    (!mainImage && index === 0) || mainImage === image.url
                      ? "border-black"
                      : ""
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-2xl font-semibold mb-1">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center space-x-4 mb-1">
                <p className="text-gray-600 text-xs line-through">
                  {selectedProduct.originalPrice &&
                    `$${selectedProduct.originalPrice}`}
                </p>

                <p className="text-gray-600 font-medium text-lg">
                  $ {selectedProduct.price}
                </p>
              </div>

              <p className="text-gray-600 mb-2 text-xs">
                {selectedProduct.description}
              </p>
              {/* Colors */}
              <div className="mb-3">
                <p className="text-gray-700 text-sm font-semibold">Color :</p>
                <div className="flex gap-2 mt-1">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full text-sm ${
                        selectedColor === color &&
                        "border-4  border-black shadow-md shadow-black"
                      } `}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div className="mb-3">
                <p className="text-gray-700 text-sm font-semibold">Size :</p>
                <div className="flex gap-2 mt-1">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-gray-300"
                      } hover:border-black transition-all`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity */}
              <div className="mb-3">
                <p className="text-gray-700 text-sm font-semibold">
                  Quantity :
                </p>
                <div className="flex items-center space-x-4 mt-1 ">
                  <button
                    onClick={() => setQuantity((prev) => prev - 1)}
                    className="border rounded px-2 py-1 text-lg font-medium bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-6 w-2">
                    {quantity > 10 ? 10 : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={quantity === 10}
                    className="border rounded px-2 py-1 text-lg font-medium bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                type="submit"
                onClick={handleAddToCart}
                className="bg-black text-white w-full py-2 px-4 rounded font-bold transition-all disabled:bg-opacity-50"
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Adding..." : "Add To Cart"}
              </button>

              <div className="mt-4">
                <h3 className="text-gray-700 text-md font-semibold">
                  Characteristics :
                </h3>
                <table className="w-full text-gray-600 text-sm text-left">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand :</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material :</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl font-medium text-center mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
