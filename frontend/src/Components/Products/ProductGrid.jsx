import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="w-full h-40 md:h-56 mb-4">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover mb-4 rounded-lg"
                  />
                </div>
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-500 font-medium text-sm tracking-tighter">
                  $ {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <p className="text-xl text-center">No Products Found</p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
