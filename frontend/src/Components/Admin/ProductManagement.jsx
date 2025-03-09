import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl mb-6 font-bold">Product Management</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-zinc-500">
          <thead className="bg-zinc-300 text-xs uppercase text-zinc-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-zinc-200 cursor-pointer"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{product.sku}</td>
                  <td className="py-3 px-4 text-nowrap flex items-center">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-400 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className=" p-4 text-center text-zinc-500">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
