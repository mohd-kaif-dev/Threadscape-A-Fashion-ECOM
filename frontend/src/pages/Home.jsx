import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import Hero from "../Components/Layout/Hero";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductGrid from "../Components/Products/ProductGrid";
import ProductDetails from "../Components/Products/ProductDetails";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import FeaturesSection from "../Components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best-selling products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSeller(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <main>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold">Best Sellers</h2>
      {bestSeller ? (
        <ProductDetails productId={bestSeller._id} />
      ) : (
        <p className="text-center animate-pulse">
          Loading best seller products...
        </p>
      )}
      {/* Womens Collections */}
      <div className="container mx-auto p-2">
        <h2 className="text-3xl text-center font-bold">Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      {/* Featured Collection */}
      <FeaturedCollection />
      <FeaturesSection />
      <div
        className="container mx-auto p-2 flex justify-center items-center"
        onClick={() => {
          window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: "smooth", // Enable smooth scrolling
          });
        }}
      >
        <button className="font-bold text-zinc-800 underline cursor-pointer">
          Back To Top
        </button>
      </div>
    </main>
  );
};

export default Home;
