import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";
import { X } from "lucide-react";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const handleImageDelete = async (imageId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload/${imageId}`
      );
      if (response.data) toast.success("Image deleted successfully!");

      setProductData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((image) => image.imageId !== imageId),
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting image");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    try {
      setIsUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data :", data);

      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          { imageId: data.imageId, url: data.imageURL, altText: "" },
        ],
      }));
      console.log(productData);
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    toast.success("Product updated successfully!");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6">Edit Product</h2>
      {loading && <p className="animate-pulse">Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-zinc-700"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-zinc-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Count in Stock */}
        <div className="mb-4">
          <label
            htmlFor="countInStock"
            className="block text-sm font-medium text-zinc-700"
          >
            Count In Stock
          </label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-4">
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-zinc-700"
          >
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-zinc-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-zinc-300 rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-zinc-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-2 border border-zinc-300 rounded-md"
          >
            <option value="Top Wear">Top Wear</option>
            <option value="Bottom Wear">Bottom Wear</option>
          </select>
        </div>
        {/* Sizes */}
        <div className="mb-4">
          <label
            htmlFor="sizes"
            className="block text-sm font-medium text-zinc-700"
          >
            Sizes (Comma Separated)
          </label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={handleArrayChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Colors */}
        <div className="mb-4">
          <label
            htmlFor="colors"
            className="block text-sm font-medium text-zinc-700"
          >
            Colors (Comma Separated)
          </label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={handleArrayChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>

        {/* Collections */}
        <div className="mb-4">
          <label
            htmlFor="collections"
            className="block text-sm font-medium text-zinc-700"
          >
            Collections
          </label>
          <input
            type="text"
            id="collections"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Brand */}
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-zinc-700"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Material */}
        <div className="mb-4">
          <label
            htmlFor="material"
            className="block text-sm font-medium text-zinc-700"
          >
            Material
          </label>
          <input
            type="text"
            id="material"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="p-2 border border-zinc-300 rounded-md w-full"
            required
          />
        </div>
        {/* Images */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-zinc-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
          />
          <div className="flex gap-4 mt-4">
            {isUploading ? (
              <p>Uploading ...</p>
            ) : (
              productData.images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-[-10px] right-[-10px] z-10 bg-white rounded-full w-4 h-4 flex items-center justify-center cursor-pointer shadow-md shadow-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        handleImageDelete(image.imageId);
                      }}
                    >
                      <X className="w-4 h-4 text-black" />
                    </button>
                  </div>
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="w-24 h-24 object-cover rounded-md shadow-lg shadow-zinc-800"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-greeen-700 transition-colors"
        >
          Update Product
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to={`/product/${productData._id}`} className={"text-blue-500"}>
          View Product
        </Link>
      </div>
    </div>
  );
};

export default EditProductPage;
